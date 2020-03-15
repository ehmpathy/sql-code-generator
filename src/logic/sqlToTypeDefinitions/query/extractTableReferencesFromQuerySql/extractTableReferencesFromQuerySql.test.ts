import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTableReferencesFromQuerySql } from './extractTableReferencesFromQuerySql';

describe('extractTableReferencesFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_image_by_id.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/select_suggestion.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
});
