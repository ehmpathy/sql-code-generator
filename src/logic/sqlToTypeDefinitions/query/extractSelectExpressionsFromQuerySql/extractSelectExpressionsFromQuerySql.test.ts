import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractSelectExpressionsFromQuerySql } from './extractSelectExpressionsFromQuerySql';

describe('extractSelectExpressionsFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_image_by_id.sql`,
    });
    const defs = extractSelectExpressionsFromQuerySql({ sql });
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/select_suggestion.sql`,
    });
    const defs = extractSelectExpressionsFromQuerySql({ sql });
    expect(defs.slice(-1)[0]!.alias).toEqual('updated_at');
    expect(defs.slice(-1)[0]!.typeReference.tableReferencePath).toEqual(
      'v.created_at',
    );
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for query selecting function output', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/upsert_suggestion.sql`,
    });
    const defs = extractSelectExpressionsFromQuerySql({ sql });
    expect(defs[0]!.alias).toEqual('id');
    expect(defs[0]!.typeReference.functionReferencePath).toEqual(
      'upsert_suggestion.output',
    );
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for query selecting function output and normal table columns', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const defs = extractSelectExpressionsFromQuerySql({ sql });
    expect(defs[1]!.alias).toEqual('full_name');
    expect(defs[1]!.typeReference.functionReferencePath).toEqual(
      'concat.output',
    );
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for query with subquery', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../__test_assets__/find_with_subselect_in_select_expressions.sql`,
    });
    const defs = extractSelectExpressionsFromQuerySql({ sql });
    expect(defs[3]!.alias).toEqual('ingredient_ids');
    expect(defs[3]!.typeReference.functionReferencePath).toEqual(
      'group_concat.output',
    );
    expect(defs).toMatchSnapshot();
  });
});
