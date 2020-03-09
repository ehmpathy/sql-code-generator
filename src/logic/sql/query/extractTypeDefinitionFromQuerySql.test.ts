import { getSqlFromFile } from '../../config/_utils/getSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from './extractTypeDefinitionFromQuerySql';

describe('extractTypeDefinitionFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/find_image_by_id.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/select_suggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it.skip('should be able to determine types accurately for yet another example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/upsert_suggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
});
