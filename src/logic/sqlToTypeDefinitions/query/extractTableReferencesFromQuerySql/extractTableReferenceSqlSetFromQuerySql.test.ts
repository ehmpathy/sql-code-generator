import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTableReferenceSqlSetFromQuerySql } from './extractTableReferenceSqlSetFromQuerySql';

describe('extractTableReferenceSqlSetFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_image_by_id.sql`,
    });
    const defs = extractTableReferenceSqlSetFromQuerySql({ sql });
    expect(defs).toEqual(['FROM image i']);
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/select_suggestion.sql`,
    });
    const defs = extractTableReferenceSqlSetFromQuerySql({ sql });
    expect(defs).toEqual([
      'FROM suggestion s',
      'JOIN suggestion_cvp cvp ON s.id = cvp.suggestion_id',
      'JOIN suggestion_version v ON v.id = cvp.suggestion_version_id',
    ]);
  });
});
