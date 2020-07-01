import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromViewSql } from './extractTypeDefinitionFromViewSql';

describe('extractTypeDefinitionFromViewSql', () => {
  it('should be able to extract types in this example', async () => {
    const exampleSql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/views/view_suggestion_current.sql`,
    });
    const typeDef = extractTypeDefinitionFromViewSql({ name: 'view_suggestion_current', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it('should be able to extract types in this other example', async () => {
    const exampleSql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/views/view_job_current.sql`,
    });
    const typeDef = extractTypeDefinitionFromViewSql({ name: 'view_suggestion_current', sql: exampleSql });
    expect(typeDef).toMatchSnapshot();
  });
  it.todo('should throw an error if query has input variables');
});
