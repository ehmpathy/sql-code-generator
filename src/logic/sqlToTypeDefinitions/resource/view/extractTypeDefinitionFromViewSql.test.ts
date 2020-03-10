import { extractTypeDefinitionFromViewSql } from './extractTypeDefinitionFromViewSql';
import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';

describe('extractTypeDefinitionFromViewSql', () => {
  it('should be able to extract types in this example', async () => {
    const exampleSql = await getSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/views/view_suggestion_current.sql`,
    });
    const typeDef = extractTypeDefinitionFromViewSql({ name: 'view_suggestion_current', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it.todo('should throw an error if query has input variables');
});
