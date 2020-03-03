import { extractTypeDefinitionFromTableSql } from './extractTypeDefinitionFromTableSql';
import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';

describe('extractTypeDefinitionFromTableSql', () => {
  it('should be able to extract types in this example', async () => {
    const exampleSql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/image.sql` });
    const typeDef = extractTypeDefinitionFromTableSql({ name: 'image', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it('should be able to extract types in this other example', async () => {
    const exampleSql = await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/suggestion_version.sql` });
    const typeDef = extractTypeDefinitionFromTableSql({ name: 'suggestion_version', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
});
