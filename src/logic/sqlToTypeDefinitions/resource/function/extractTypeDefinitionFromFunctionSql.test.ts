import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromFunctionSql } from './extractTypeDefinitionFromFunctionSql';

describe('extractTypeDefinitionFromFunctionSql', () => {
  describe('mysql', () => {
    it('should be able to extract types in this example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_image.mysql.sql`,
      });
      const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'upsert_image', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
    it('should be able to extract types in this other example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_suggestion.mysql.sql`,
      });
      const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'upsert_suggestion', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
    it('should be able to extract types in this other other example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/hash_string.mysql.sql`,
      });
      const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'hash_string', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
  });
  describe('postgres', () => {
    it('should be able to extract types in this example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_photo.postgres.sql`,
      });
      const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'upsert_photo', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
    it('should be able to extract types in this other example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/functions/upsert_job.postgres.sql`,
      });
      const typeDef = extractTypeDefinitionFromFunctionSql({ name: 'upsert_job', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
  });
});
