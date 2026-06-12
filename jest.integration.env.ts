import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import util from 'node:util';

import { jest } from '@jest/globals';
import { keyrack } from 'rhachet/keyrack';

jest.setTimeout(90000); // since we're calling downstream apis

// set console.log to not truncate nested objects
util.inspect.defaultOptions.depth = 5;

/**
 * .what = verify that we're running from a valid project directory; otherwise, fail fast
 * .why = prevent confusion and hard-to-debug errors from running tests in the wrong directory
 */
if (!existsSync(join(process.cwd(), 'package.json')))
  throw new Error('no package.json found in cwd. are you @gitroot?');

/**
 * sanity check that unit tests are only run the 'test' environment
 *
 * usecases
 * - prevent polluting prod state with test data
 * - prevent executing financially impacting mutations
 */
if (
  (process.env.NODE_ENV !== 'test' ||
    (process.env.CONFIG && process.env.CONFIG !== 'test')) &&
  process.env.I_KNOW_THE_RISKS !== 'true'
)
  throw new Error(`integration.test config must be 'test'`);

/**
 * .what = source aws profile from keyrack if available
 * .why = keyrack manages which profile to use per environment
 */
const keyrackYmlPath = join(process.cwd(), '.agent/keyrack.yml');
if (existsSync(keyrackYmlPath) && !process.env.CI)
  keyrack.source({ env: 'test', owner: 'ehmpath', mode: 'lenient' });

/**
 * .what = export aws credentials from sso profile if aws is required
 * .why = aws sdk v2 doesn't handle sso_session profiles natively
 */
const declapractUsePath = join(process.cwd(), 'declapract.use.yml');
const declapractUseContent = existsSync(declapractUsePath)
  ? readFileSync(declapractUsePath, 'utf8')
  : '';
const requiresAwsAuth = declapractUseContent.includes('awsAccountId');
if (requiresAwsAuth && !process.env.AWS_ACCESS_KEY_ID && !process.env.CI) {
  const awsSsoProfile = process.env.AWS_PROFILE;
  if (!awsSsoProfile)
    throw new Error(
      'AWS_PROFILE not set. keyrack.source() should have set it.',
    );
  try {
    const credOutput = execSync(
      `aws configure export-credentials --profile ${awsSsoProfile} --format env`,
      { encoding: 'utf8', timeout: 10000 },
    );
    // parse and set env vars from output like "export AWS_ACCESS_KEY_ID=..."
    credOutput.split('\n').forEach((line) => {
      const match = line.match(/^export\s+(\w+)=(.*)$/);
      if (match) process.env[match[1]!] = match[2]!;
    });
  } catch {
    throw new Error(
      `failed to export aws credentials from sso profile '${awsSsoProfile}'. run: aws sso login --profile ${awsSsoProfile}`,
    );
  }
}

/**
 * .what = verify that the testdb has been provisioned if a databaseUserName is declared
 * .why =
 *   - prevent time wasted waiting on tests to fail due to missing testdb
 *   - prevent confusing "password authentication failed" errors when testdb isn't running or was provisioned for a different repo
 */
const requiresTestDb = declapractUseContent.includes('databaseUserName');
if (requiresTestDb) {
  const testConfigPath = join(process.cwd(), 'config', 'test.json');
  if (!existsSync(testConfigPath))
    throw new Error(
      'config/test.json not found but serviceUser is declared in declapract.use.yml',
    );
  const testConfig = JSON.parse(readFileSync(testConfigPath, 'utf8'));
  if (
    !testConfig.database?.tunnel?.local ||
    !testConfig.database?.role?.crud ||
    !testConfig.database?.target?.database
  )
    throw new Error(
      'config/test.json database.tunnel.local, database?.role?.crud, or database?.target?.database not found but expected',
    );
  try {
    execSync(
      `PGPASSWORD="${testConfig.database.role.crud.password}" psql -h ${testConfig.database.tunnel.local.host} -p ${testConfig.database.tunnel.local.port} -U ${testConfig.database.role.crud.username} -d ${testConfig.database.target.database} -c "SELECT 1" > /dev/null 2>&1`,
      { timeout: 3000 },
    );
  } catch (error) {
    throw new Error(
      `did you forget to \`npm run start:testdb\`? cant connect to database`,
      { cause: error },
    );
  }
}
