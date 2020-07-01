import { extractSqlFromFile } from '../../../../common/extractSqlFromFile';
import { extractInputsFromFunctionSql } from './extractInputsFromFunctionSql';

describe('extractInputsFromFunctionSql', () => {
  describe('mysql', () => {
    it('should extract the inputs accurately in this example', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_image.mysql.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately in this other example', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_suggestion.mysql.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately in this other example again', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/hash_string.mysql.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
  });
  describe('postgres', () => {
    it('should extract the inputs accurately in this example', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_photo.postgres.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately when one of the inputs is an array type', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/upsert_job.postgres.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately there is no input args', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../__test_assets__/functions/get_answer_to_life.postgres.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
  });
});
