import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromTableSql } from '../../../sqlToTypeDefinitions/resource/table/extractTypeDefinitionFromTableSql';
import { defineTypescriptTypesForTable } from './defineTypescriptTypesForTable';

describe('defineTypescriptTypesForTable', () => {
  it('should generate an accurate looking interface for this table definition', async () => {
    const definition = extractTypeDefinitionFromTableSql({
      name: 'image',
      sql: await extractSqlFromFile({ filePath: `${__dirname}/../../../__test_assets__/tables/image.sql` }),
    });
    const code = defineTypescriptTypesForTable({ definition });
    expect(code).toMatchSnapshot();
  });
  it('should generate an accurate looking interface for this other table definition', async () => {
    const definition = extractTypeDefinitionFromTableSql({
      name: 'suggestion_version',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/tables/suggestion_version.sql`,
      }),
    });
    const code = defineTypescriptTypesForTable({ definition });
    expect(code).toMatchSnapshot();
  });
});
