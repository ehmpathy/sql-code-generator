import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromTableSql } from '../../../sqlToTypeDefinitions/resource/table/extractTypeDefinitionFromTableSql';
import { defineTypescriptTypesForTable } from './defineTypescriptTypesForTable';

describe('defineTypescriptTypesForTable', () => {
  it('should generate an accurate looking interface for this table definition', async () => {
    const definition = extractTypeDefinitionFromTableSql({
      name: 'image',
      sql: await extractSqlFromFile({ filePath: `${__dirname}/../../../__test_assets__/tables/image.mysql.sql` }),
    });
    const code = defineTypescriptTypesForTable({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate an accurate looking interface for this other table definition', async () => {
    const definition = extractTypeDefinitionFromTableSql({
      name: 'suggestion_version',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/suggestion_version.mysql.sql`,
      }),
    });
    const code = defineTypescriptTypesForTable({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate an accurate looking interface for this other table definition, again', async () => {
    const definition = extractTypeDefinitionFromTableSql({
      name: 'job_version',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/job_version.postgres.sql`,
      }),
    });
    const code = defineTypescriptTypesForTable({ definition });
    expect(code).toMatchSnapshot();
  });
});
