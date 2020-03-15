import { extractSqlFromFile } from '../../common/extractSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from '../../sqlToTypeDefinitions/query/extractTypeDefinitionFromQuerySql';
import { defineTypescriptTypesForQuery } from './defineTypescriptTypesForQuery';

describe('defineTypescriptTypesForQuery', () => {
  it('should be able to determine types accurately an example of selecting columns a single table by id', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_image_by_id.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({ name: 'find_image_by_id', sql });
    const code = defineTypescriptTypesForQuery({ definition: def });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately when selecting columns from multiple tables, no input variables', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/select_suggestion.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({ name: 'select_suggestion', sql });
    const code = defineTypescriptTypesForQuery({ definition: def });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately an upsert query', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/upsert_suggestion.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({ name: 'upsert_suggestion', sql });
    const code = defineTypescriptTypesForQuery({ definition: def });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this example that selects both from tables and functions', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({ name: 'find_users_by_last_name', sql });
    const code = defineTypescriptTypesForQuery({ definition: def });
    expect(code).toMatchSnapshot();
  });
});
