import { getSqlFromFile } from '../../config/_utils/getSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from './extractTypeDefinitionFromQuerySql';

describe('extractTypeDefinitionFromQuerySql', () => {
  it('should be able to determine types accurately an example of selecting columns a single table by id', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/find_image_by_id.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately when selecting columns from multiple tables, no input variables', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/select_suggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately an upsert query', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/upsert_suggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this example that selects both from tables and functions', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/find_users_by_last_name.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
});
