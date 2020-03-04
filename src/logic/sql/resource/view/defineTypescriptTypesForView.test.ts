import { defineTypescriptTypesForView } from './defineTypescriptTypesForView';
import { extractTypeDefinitionFromViewSql } from './extractTypeDefinitionFromViewSql';
import { getSqlFromFile } from '../../../config/_utils/getSqlFromFile';

describe('defineTypescriptTypesForView', () => {
  it('should generate an accurate looking interface for this table definition', async () => {
    const definition = extractTypeDefinitionFromViewSql({
      name: 'image',
      sql: await getSqlFromFile({ filePath: `${__dirname}/__test_assets__/view_suggestion_current.sql` }),
    });
    const code = defineTypescriptTypesForView({ definition });
    expect(code).toMatchSnapshot();
  });
});
