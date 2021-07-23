import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromFunctionSql } from '../../../sqlToTypeDefinitions/resource/function/extractTypeDefinitionFromFunctionSql';
import { defineTypescriptTypesForFunction } from './defineTypescriptTypesForFunction';

describe('defineTypescriptTypesForFunction', () => {
  it('should generate accurate looking types for this function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_image',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_image.mysql.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_suggestion',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_suggestion.mysql.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'hash_string',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/hash_string.mysql.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other other other function definition', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_photo',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_photo.postgres.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for this other function definition, with array inputs', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_job',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_job.postgres.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate accurate looking types for a function that returns a table', async () => {
    const definition = extractTypeDefinitionFromFunctionSql({
      name: 'upsert_jerb',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_jerb.postgres.sql`,
      }),
    });
    const code = defineTypescriptTypesForFunction({ definition });
    expect(code).toMatchSnapshot();
  });
});
