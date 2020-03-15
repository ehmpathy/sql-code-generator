import { extractSqlFromFile } from '../../../common/extractSqlFromFile';
import { extractTypeDefinitionFromViewSql } from '../../../sqlToTypeDefinitions/resource/view/extractTypeDefinitionFromViewSql';
import { defineTypescriptTypesForView } from './defineTypescriptTypesForView';

describe('defineTypescriptTypesForView', () => {
  it('should generate an accurate looking interface for a view joining three tables and selecting from two', async () => {
    const definition = extractTypeDefinitionFromViewSql({
      name: 'image',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../__test_assets__/views/view_suggestion_current.sql`,
      }),
    });
    const code = defineTypescriptTypesForView({ definition });
    expect(code).toMatchSnapshot();
  });
});
