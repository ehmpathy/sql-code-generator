import { getSqlFromFile } from '../../config/_utils/getSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from './extractTypeDefinitionFromQuerySql';

describe('extractTypeDefinitionFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/selectImageById.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/selectSuggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
});
