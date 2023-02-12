import { extractSqlFromFile } from '../../common/extractSqlFromFile';
import { extractNameFromQuerySql } from './extractNameFromQuerySql';

describe('extractNameFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/__test_assets__/find_all_by_name_excluding_one_field.sql`,
    });
    const name = extractNameFromQuerySql({ sql });
    expect(name).toEqual('find_all_by_name');
  });
  it('should throw an error if query name is not defined', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/__test_assets__/query_without_name.sql`,
    });
    try {
      extractNameFromQuerySql({ sql });
    } catch (error) {
      expect(error.message).toContain(
        'sql for query does not have name defined',
      );
    }
  });
});
