import { extractInputsFromFunctionSql } from './extractInputsFromFunctionSql';
import { getSqlFromFile } from '../../../../config/_utils/getSqlFromFile';

describe('extractInputsFromFunctionSql', () => {
  it('should extract the inputs accurately in this example', async () => {
    const defs = extractInputsFromFunctionSql({
      sql: await getSqlFromFile({ filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_image.sql` }),
    });
    expect(defs).toMatchSnapshot();
  });
  it('should extract the inputs accurately in this other example', async () => {
    const defs = extractInputsFromFunctionSql({
      sql: await getSqlFromFile({
        filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_suggestion.sql`,
      }),
    });
    expect(defs).toMatchSnapshot();
  });
  it('should extract the inputs accurately in this other example again', async () => {
    const defs = extractInputsFromFunctionSql({
      sql: await getSqlFromFile({ filePath: `${__dirname}/../../../../__test_assets__/functions/hash_string.sql` }),
    });
    expect(defs).toMatchSnapshot();
  });
});
