import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromTableSql } from './extractTypeDefinitionFromTableSql';

describe('extractTypeDefinitionFromTableSql', () => {
  it('should be able to extract types in this example', async () => {
    const exampleSql = await extractSqlFromFile({ filePath: `${__dirname}/../../../__test_assets__/tables/image.sql` });
    const typeDef = extractTypeDefinitionFromTableSql({ name: 'image', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it('should be able to extract types in this other example', async () => {
    const exampleSql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/tables/suggestion_version.sql`,
    });
    const typeDef = extractTypeDefinitionFromTableSql({ name: 'suggestion_version', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
});
