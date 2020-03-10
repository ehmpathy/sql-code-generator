import { extractInputVariablesFromQuerySql } from './extractInputVariablesFromQuerySql';
import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';

describe('extractSelectExpressionsFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/find_image_by_id.sql` });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(1);
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/select_suggestion.sql` });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(0);
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other other example', async () => {
    const sql = await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/upsert_suggestion.sql` });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(5);
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for yet another example', async () => {
    const sql = await getSqlFromFile({
      filePath: `${__dirname}/../__test_assets__/find_all_suggestions_by_normalized_source.sql`,
    });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(1);
    expect(defs).toMatchSnapshot();
  });
});
