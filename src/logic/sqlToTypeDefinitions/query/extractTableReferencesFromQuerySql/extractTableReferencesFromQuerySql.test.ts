import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTableReferencesFromQuerySql } from './extractTableReferencesFromQuerySql';
import { TypeDefinitionOfQueryTableReference } from '../../../../model';

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
  it('should be able to determine types accurately for an example joining to multiple tables', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs.length).toEqual(3);
    expect(defs).toContainEqual(
      new TypeDefinitionOfQueryTableReference({ alias: 'up', tableName: 'view_user_profile_current' }),
    );
    expect(defs).toMatchSnapshot();
  });
});
