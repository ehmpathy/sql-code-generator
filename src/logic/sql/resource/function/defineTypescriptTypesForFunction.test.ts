import { defineTypescriptTypesForFunction } from './defineTypescriptTypesForFunction';
import { extractTypeDefinitionFromFunctionSql } from './extractTypeDefinitionFromFunctionSql';
import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';

describe('defineTypescriptTypesForFunction', () => {
  it('should generate accurate looking types for this function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_image',
      sql: await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/upsert_image.sql` }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_suggestion',
      sql: await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/upsert_suggestion.sql` }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'hash_string',
      sql: await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/hash_string.sql` }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
});
