import { DataType } from '../../../../../model';
import { extractSqlFromFile } from '../../../../common/extractSqlFromFile';
import { extractOutputFromFunctionSql } from './extractOutputFromFunctionSql';

describe('extractOutputsFromFunctionSql', () => {
  it('should extract the inputs accurately in this example', async () => {
    const type = extractOutputFromFunctionSql({
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_image.sql`,
      }),
    });
    expect(type).toEqual([DataType.NUMBER]);
  });
  it('should extract the inputs accurately in this other example', async () => {
    const type = extractOutputFromFunctionSql({
      sql: await extractSqlFromFile({ filePath: `${__dirname}/../../../../__test_assets__/functions/hash_string.sql` }),
    });
    expect(type).toEqual([DataType.STRING]);
  });
});
