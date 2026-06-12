import { extractSqlFromFile } from '@src/domain.operations/common/extractSqlFromFile';

import { extractInputsFromFunctionSql } from './extractInputsFromFunctionSql';

describe('extractInputsFromFunctionSql', () => {
  describe('mysql', () => {
    it('should extract the inputs accurately in this example', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../.test.assets/functions/upsert_image.mysql.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately in this other example', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../.test.assets/functions/upsert_suggestion.mysql.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately in this other example again', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../.test.assets/functions/hash_string.mysql.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
  });
  describe('postgres', () => {
    it('should extract the inputs accurately in this example', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../.test.assets/functions/upsert_photo.postgres.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately when one of the inputs is an array type', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../.test.assets/functions/upsert_job.postgres.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
    it('should extract the inputs accurately there is no input args', async () => {
      const defs = extractInputsFromFunctionSql({
        sql: await extractSqlFromFile({
          filePath: `${__dirname}/../../../../.test.assets/functions/get_answer_to_life.postgres.sql`,
        }),
      });
      expect(defs).toMatchSnapshot();
    });
  });
});
