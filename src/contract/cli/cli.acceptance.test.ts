import { genTempDir, given, then, useThen, when } from 'test-fns';

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.join(__dirname, '../../..');

/**
 * .what = runs execSync and captures any error
 * .why = execSync throws synchronously; need to catch for negative tests
 */
const runCli = (
  args: string,
  options: { cwd: string },
): { stdout: string | null; error: Error | null } => {
  try {
    const stdout = execSync(`${repoRoot}/bin/run ${args}`, {
      cwd: options.cwd,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    return { stdout, error: null };
  } catch (err) {
    return { stdout: null, error: err as Error };
  }
};

describe('sql-code-generator cli', () => {
  given('[case1] valid config with types and query functions', () => {
    const testDir = genTempDir({
      slug: 'cli-types-and-fns',
      clone: './src/contract/.test.assets',
    });

    when('[t0] cli generate command is invoked', () => {
      useThen('it completes without error', () => {
        execSync(`${repoRoot}/bin/run generate -c ${testDir}/codegen.sql.yml`, {
          cwd: repoRoot,
          encoding: 'utf-8',
        });
        return {};
      });

      then('types file is generated', () => {
        const typesOutput = path.join(
          testDir,
          'src/generated/fromSql/types.ts',
        );
        expect(existsSync(typesOutput)).toBe(true);
        const content = readFileSync(typesOutput, 'utf-8');
        expect(content).toContain('export type');
      });

      then('query functions file is generated', () => {
        const queryFunctionsOutput = path.join(
          testDir,
          'src/generated/fromSql/queryFunctions.ts',
        );
        expect(existsSync(queryFunctionsOutput)).toBe(true);
        const content = readFileSync(queryFunctionsOutput, 'utf-8');
        expect(content).toContain('export const');
      });
    });
  });

  given('[case2] valid config with only types', () => {
    const testDir = genTempDir({
      slug: 'cli-only-types',
      clone: './src/contract/.test.assets',
    });

    when('[t0] cli generate command is invoked', () => {
      useThen('it completes without error', () => {
        execSync(
          `${repoRoot}/bin/run generate -c ${testDir}/codegen.sql.only-types.yml`,
          {
            cwd: repoRoot,
            encoding: 'utf-8',
          },
        );
        return {};
      });

      then('types file is generated', () => {
        const typesOutput = path.join(
          testDir,
          'src/generated/fromSql/types.ts',
        );
        expect(existsSync(typesOutput)).toBe(true);
        const content = readFileSync(typesOutput, 'utf-8');
        expect(content).toContain('export type');
      });
    });
  });

  given('[case3] --help flag', () => {
    when('[t0] cli is invoked with --help', () => {
      then('it shows usage information', () => {
        const result = execSync(`${repoRoot}/bin/run --help`, {
          cwd: repoRoot,
          encoding: 'utf-8',
        });
        expect(result).toContain('sql-code-generator');
        expect(result).toContain('generate');
        expect(result).toContain('Options');
      });
    });
  });

  given('[case4] generate --help flag', () => {
    when('[t0] cli generate is invoked with --help', () => {
      then('it shows generate command usage', () => {
        const result = execSync(`${repoRoot}/bin/run generate --help`, {
          cwd: repoRoot,
          encoding: 'utf-8',
        });
        expect(result).toContain('--config');
        expect(result).toContain('codegen.sql.yml');
      });
    });
  });

  given('[case5] config file not found', () => {
    const testDir = genTempDir({ slug: 'cli-config-not-found' });

    when('[t0] cli is invoked with nonexistent config', () => {
      then('it exits with error', () => {
        const { error } = runCli(`generate -c ${testDir}/nonexistent.yml`, {
          cwd: repoRoot,
        });
        expect(error).not.toBeNull();
        expect(error!.message).toMatch(/ENOENT|no such file/i);
      });
    });
  });

  given('[case6] invalid yaml config', () => {
    const testDir = genTempDir({ slug: 'cli-invalid-yaml' });
    writeFileSync(
      path.join(testDir, 'codegen.sql.yml'),
      'invalid: yaml: content: [unclosed',
    );

    when('[t0] cli is invoked with invalid yaml', () => {
      then('it exits with error', () => {
        const { error } = runCli(`generate -c ${testDir}/codegen.sql.yml`, {
          cwd: repoRoot,
        });
        expect(error).not.toBeNull();
      });
    });
  });

  given('[case7] invalid sql syntax', () => {
    const testDir = genTempDir({ slug: 'cli-invalid-sql' });

    // create minimal config
    writeFileSync(
      path.join(testDir, 'codegen.sql.yml'),
      `language: mysql
dialect: 5.7
resources:
  - 'schema/**/*.sql'
generates:
  types: src/generated/types.ts
`,
    );

    // create invalid sql
    mkdirSync(path.join(testDir, 'schema'), { recursive: true });
    writeFileSync(
      path.join(testDir, 'schema/broken.sql'),
      'CREATE TABL broken_syntax ((',
    );

    when('[t0] cli is invoked with invalid sql', () => {
      then('it exits with error', () => {
        const { error } = runCli(`generate -c ${testDir}/codegen.sql.yml`, {
          cwd: testDir,
        });
        expect(error).not.toBeNull();
      });
    });
  });

  given('[case8] no resources found', () => {
    const testDir = genTempDir({ slug: 'cli-no-resources' });

    // create config that references empty dir
    writeFileSync(
      path.join(testDir, 'codegen.sql.yml'),
      `language: mysql
dialect: 5.7
resources:
  - 'schema/**/*.sql'
generates:
  types: src/generated/types.ts
`,
    );

    // create empty schema dir (no sql files)
    mkdirSync(path.join(testDir, 'schema'), { recursive: true });

    when('[t0] cli is invoked with no resources found', () => {
      then('it exits with error', () => {
        const { error } = runCli(`generate -c ${testDir}/codegen.sql.yml`, {
          cwd: testDir,
        });
        expect(error).not.toBeNull();
      });
    });
  });
});
