import { TypeDefinitionOfQueryTableReference } from '../../../../domain';
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
  it('should be able to determine types accurately for an example joining to multiple tables', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs.length).toEqual(3);
    expect(defs).toContainEqual(
      new TypeDefinitionOfQueryTableReference({
        alias: 'up',
        tableName: 'view_user_profile_current',
        functionName: null,
      }),
    );
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for an example with subqueries referencing their own tables', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_providers_with_work_count.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs.length).toEqual(2);
    expect(defs).toContainEqual(
      new TypeDefinitionOfQueryTableReference({
        alias: 'w',
        tableName: 'work',
        functionName: null,
      }),
    ); // has the subqueries definition
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for queries that select from a function that returns a table', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/upsert_jerb.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs.length).toEqual(1);
    expect(defs).toContainEqual(
      new TypeDefinitionOfQueryTableReference({
        alias: 'dgv',
        tableName: null,
        functionName: 'upsert_jerb',
      }),
    ); // has the subqueries definition
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for an example joining to multiple tables without any explicit table aliases defined', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_users_by_last_name_no_aliases.sql`,
    });
    const defs = extractTableReferencesFromQuerySql({ sql });
    expect(defs.length).toEqual(3);
    expect(defs).toContainEqual(
      new TypeDefinitionOfQueryTableReference({
        alias: 'view_user_profile_current',
        tableName: 'view_user_profile_current',
        functionName: null,
      }),
    );
    expect(defs).toMatchSnapshot();
  });
});
