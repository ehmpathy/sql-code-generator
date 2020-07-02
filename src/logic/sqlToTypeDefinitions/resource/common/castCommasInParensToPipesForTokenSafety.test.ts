import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { castCommasInParensToPipesForTokenSafety } from './castCommasInParensToPipesForTokenSafety';

describe('castCommasInParensToPipesForTokenSafety', () => {
  it('should cast correctly for this example', async () => {
    const exampleSql = await extractSqlFromFile({
      filePath: `${__dirname}/__test_assets__/suggestion_version.insides.sql`,
    });
    const castedSql = castCommasInParensToPipesForTokenSafety({ sql: exampleSql });
    expect(castedSql).toMatchSnapshot();
  });
  it('should cast correctly for this example with nested parens', async () => {
    const exampleSql = await extractSqlFromFile({
      filePath: `${__dirname}/__test_assets__/job.insides.sql`,
    });
    const castedSql = castCommasInParensToPipesForTokenSafety({ sql: exampleSql });
    expect(castedSql).toMatchSnapshot();
  });
});
