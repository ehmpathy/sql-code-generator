import { getSqlFromFile } from '../../config/_utils/getSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from './extractTypeDefinitionFromQuerySql';

describe('extractTypeDefinitionFromQuerySql', () => {
  it('should be able to determine types accurately an example of selecting columns a single table by id', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../../__test_assets__/queries/find_image_by_id.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ name: 'find_image_by_id', sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately when selecting columns from multiple tables, no input variables', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../../__test_assets__/queries/select_suggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ name: 'select_suggestion', sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately an upsert query', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../../__test_assets__/queries/upsert_suggestion.sql` });
    const defs = extractTypeDefinitionFromQuerySql({ name: 'upsert_suggestion', sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this example that selects both from tables and functions', async () => {
    const sql = await getSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const defs = extractTypeDefinitionFromQuerySql({ name: 'find_users_by_last_name', sql });
    expect(defs).toMatchSnapshot();
  });
  it.only('should be able to determine types accurately for query which comments out one of the select expressions', async () => {
    const sql = await getSqlFromFile({
      filePath: `${__dirname}/__test_assets__/find_all_by_name_excluding_one_field.sql`,
    });
    const defs = extractTypeDefinitionFromQuerySql({ name: 'find_all_by_name_excluding_one_field', sql });
    expect(defs.selectExpressions.length).toEqual(2);
    expect(defs.selectExpressions.map((def) => def.alias)).not.toContain('full_name'); // since this was commented out
    expect(defs).toMatchSnapshot();
  });
});
