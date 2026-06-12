import { TypeDefinitionOfResourceTable } from '@src/domain.objects';
import { extractSqlFromFile } from '@src/domain.operations/common/extractSqlFromFile';
import { extractTypeDefinitionFromViewSql } from '@src/domain.operations/sqlToTypeDefinitions/resource/view/extractTypeDefinitionFromViewSql';

import { defineTypescriptTypesForView } from './defineTypescriptTypesForView';

describe('defineTypescriptTypesForView', () => {
  it('should generate an accurate looking interface for a view joining three tables and selecting from two', async () => {
    const definition = extractTypeDefinitionFromViewSql({
      name: 'image',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../.test.assets/views/view_suggestion_current.sql`,
      }),
    });
    const code = defineTypescriptTypesForView({
      definition,
      allDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'suggestion', columns: [] }),
        new TypeDefinitionOfResourceTable({
          name: 'suggestion_version',
          columns: [],
        }),
      ],
    });
    expect(code).toMatchSnapshot();
  });
  it('should generate an accurate looking interface for another view joining three tables and selecting from two', async () => {
    const definition = extractTypeDefinitionFromViewSql({
      name: 'image',
      sql: await extractSqlFromFile({
        filePath: `${__dirname}/../../../.test.assets/views/view_job_current.sql`,
      }),
    });
    const code = defineTypescriptTypesForView({
      definition,
      allDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'job', columns: [] }),
        new TypeDefinitionOfResourceTable({ name: 'job_version', columns: [] }),
      ],
    });
    expect(code).toMatchSnapshot();
  });
});
