import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';
import { castCommasInParensToPipesForTokenSafety } from './castCommasInParensToPipesForTokenSafety';

describe('castCommasInParensToPipesForTokenSafety', () => {
  it('should cast correctly for this example', async () => {
    const exampleSql = await getSqlFromFile({
      filePath: `${__dirname}/__test_assets__/suggestion_version.insides.sql`,
    });
    const castedSql = castCommasInParensToPipesForTokenSafety({ sql: exampleSql });
    expect(castedSql).toMatchSnapshot();
  });
});
