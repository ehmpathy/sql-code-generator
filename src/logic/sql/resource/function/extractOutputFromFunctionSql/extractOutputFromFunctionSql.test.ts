import { extractOutputFromFunctionSql } from './extractOutputFromFunctionSql';
import { getSqlFromFile } from '../../../../config/_utils/getSqlFromFile';
import { DataType } from '../../../../../model';

describe('extractOutputsFromFunctionSql', () => {
  it('should extract the inputs accurately in this example', async () => {
    const type = extractOutputFromFunctionSql({
      sql: await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/upsert_image.sql` }),
    });
    expect(type).toEqual(DataType.NUMBER);
  });
  it('should extract the inputs accurately in this other example', async () => {
    const type = extractOutputFromFunctionSql({
      sql: await getSqlFromFile({ filePath: `${__dirname}/../__test_assets__/hash_string.sql` }),
    });
    expect(type).toEqual(DataType.STRING);
  });
});
