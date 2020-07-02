import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromTableSql } from './extractTypeDefinitionFromTableSql';

describe('extractTypeDefinitionFromTableSql', () => {
  describe('mysql', () => {
    it('should be able to extract types in this example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/image.mysql.sql`,
      });
      const typeDef = extractTypeDefinitionFromTableSql({ name: 'image', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
    it('should be able to extract types in this other example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/suggestion_version.mysql.sql`,
      });
      const typeDef = extractTypeDefinitionFromTableSql({ name: 'suggestion_version', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
  });
  describe('postgres', () => {
    it('should be able to extract types in this example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/photo.postgres.sql`,
      });
      const typeDef = extractTypeDefinitionFromTableSql({ name: 'photo', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
    it('should be able to extract types in this other example', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/job_version.postgres.sql`,
      });
      const typeDef = extractTypeDefinitionFromTableSql({ name: 'job_version', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
    it('should be able to extract types in this other example, having a check constraint with nested parens', async () => {
      const exampleSql = await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/job.postgres.sql`,
      });
      const typeDef = extractTypeDefinitionFromTableSql({ name: 'job', sql: exampleSql });
      expect(typeDef).toMatchSnapshot();
    });
  });
});
