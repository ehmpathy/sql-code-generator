import { DataType } from '../../../../../model';
import { extractSqlFromFile } from '../../../../common/extractSqlFromFile';
import { extractOutputFromFunctionSql } from './extractOutputFromFunctionSql';

describe('extractOutputsFromFunctionSql', () => {
  describe('mysql', () => {
    it('should extract the output accurately in this example', async () => {
      const type = extractOutputFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_image.mysql.sql`,
        }),
      });
      expect(type).toEqual([DataType.NUMBER]);
    });
    it('should extract the output accurately in this other example', async () => {
      const type = extractOutputFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/hash_string.mysql.sql`,
        }),
      });
      expect(type).toEqual([DataType.STRING]);
    });
  });
  describe('postgres', () => {
    it('should extract the output accurately in this example', async () => {
      const type = extractOutputFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_photo.postgres.sql`,
        }),
      });
      expect(type).toEqual([DataType.NUMBER]);
    });
    it.todo('should extract output types accurately when output is a table, instead of just a DataType[]'); // https://github.com/uladkasach/sql-code-generator/issues/20
  });
});
