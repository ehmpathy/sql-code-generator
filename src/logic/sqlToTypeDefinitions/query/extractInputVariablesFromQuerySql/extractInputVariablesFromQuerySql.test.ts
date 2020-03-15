import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractInputVariablesFromQuerySql } from './extractInputVariablesFromQuerySql';

describe('extractSelectExpressionsFromQuerySql', () => {
  it('should be able to determine types accurately for this example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_image_by_id.sql`,
    });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(1);
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/select_suggestion.sql`,
    });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(0);
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other other example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/upsert_suggestion.sql`,
    });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(5);
    expect(defs).toMatchSnapshot();
  });
  it('should be able to determine types accurately for yet another example', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../../__test_assets__/queries/find_all_suggestions_by_normalized_source.sql`,
    });
    const defs = extractInputVariablesFromQuerySql({ sql });
    expect(defs.length).toEqual(1);
    expect(defs).toMatchSnapshot();
  });
});
