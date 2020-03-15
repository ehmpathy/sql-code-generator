import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromFunctionSql } from '../../../sqlToTypeDefinitions/resource/function/extractTypeDefinitionFromFunctionSql';
import { defineTypescriptTypesForFunction } from './defineTypescriptTypesForFunction';

describe('defineTypescriptTypesForFunction', () => {
  it('should generate accurate looking types for this function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_image',
      sql: await extractSqlFromFile({ filePath: `${__dirname}/../../../__test_assets__/functions/upsert_image.sql` }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_suggestion',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_suggestion.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'hash_string',
      sql: await extractSqlFromFile({ filePath: `${__dirname}/../../../__test_assets__/functions/hash_string.sql` }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
});
