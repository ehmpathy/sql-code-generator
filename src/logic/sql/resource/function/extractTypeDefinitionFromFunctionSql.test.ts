import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';
import { extractTypeDefinitionFromFunctionSql } from './extractTypeDefinitionFromFunctionSql';

describe('extractTypeDefinitionFromFunctionSql', () => {
  it('should be able to extract types in this example', async () => {
    const exampleSql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/upsert_image.sql` });
    const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'upsert_image', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it('should be able to extract types in this other example', async () => {
    const exampleSql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/upsert_suggestion.sql` });
    const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'upsert_suggestion', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it('should be able to extract types in this other other example', async () => {
    const exampleSql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/hash_string.sql` });
    const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'hash_string', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
});
