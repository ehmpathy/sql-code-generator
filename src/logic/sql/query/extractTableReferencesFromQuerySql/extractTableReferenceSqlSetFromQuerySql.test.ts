import { extractTableReferenceSqlSetFromQuerySql } from './extractTableReferenceSqlSetFromQuerySql';
import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';

describe('extractTableReferenceSqlSetFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/selectImageById.sql` });
    const defs = extractTableReferenceSqlSetFromQuerySql({ sql });
    expect(defs).toEqual(['FROM image i']);
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/selectSuggestion.sql` });
    const defs = extractTableReferenceSqlSetFromQuerySql({ sql });
    expect(defs).toEqual([
      'FROM suggestion s',
      'JOIN suggestion_cvp cvp ON s.id = cvp.suggestion_id',
      'JOIN suggestion_version v ON v.id = cvp.suggestion_version_id',
    ]);
  });
});
