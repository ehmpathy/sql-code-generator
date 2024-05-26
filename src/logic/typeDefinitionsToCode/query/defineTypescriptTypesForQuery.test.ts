import {
  TypeDefinitionOfResourceFunction,
  TypeDefinitionOfResourceTable,
  TypeDefinitionOfResourceView,
} from '../../../domain';
import { extractSqlFromFile } from '../../common/extractSqlFromFile';
import { extractTypeDefinitionFromQuerySql } from '../../sqlToTypeDefinitions/query/extractTypeDefinitionFromQuerySql';
import { defineTypescriptTypesForQuery } from './defineTypescriptTypesForQuery';

describe('defineTypescriptTypesForQuery', () => {
  it('should be able to determine types accurately an example of selecting columns a single table by id', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_image_by_id.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'find_image_by_id',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'image', columns: [] }),
      ],
    });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately when selecting columns from multiple tables, no input variables', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/select_suggestion.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'select_suggestion',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
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
  it('should be able to determine types accurately an upsert query', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/upsert_suggestion.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'upsert_suggestion',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [],
    });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this example that selects from tables, functions, and views', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_users_by_last_name.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'find_users_by_last_name',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'user', columns: [] }),
        new TypeDefinitionOfResourceTable({ name: 'phone', columns: [] }),
        new TypeDefinitionOfResourceView({
          name: 'view_user_profile_current',
          selectExpressions: [],
          tableReferences: [],
        }),
      ],
    });
    expect(code).toMatchSnapshot();
  });
  it('should be able to determine types accurately for this other example that selects from tables, functions, and views', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_users_by_last_name_in.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'find_users_by_last_name_in',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'user', columns: [] }),
        new TypeDefinitionOfResourceTable({ name: 'phone', columns: [] }),
        new TypeDefinitionOfResourceView({
          name: 'view_user_profile_current',
          selectExpressions: [],
          tableReferences: [],
        }),
      ],
    });
    expect(code).toContain(`candidateLastNames: SqlTableUser['last_name'][]`);
    expect(code).toMatchSnapshot();
  });
  it('should be able to define types accurately a query with subqueries and unnesting', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_train_by_id.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'find_train_by_id',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [
        new TypeDefinitionOfResourceView({
          name: 'view_train_current',
          selectExpressions: [],
          tableReferences: [],
        }),
        new TypeDefinitionOfResourceTable({ name: 'locomotive', columns: [] }),
        new TypeDefinitionOfResourceTable({ name: 'carriage', columns: [] }),
        new TypeDefinitionOfResourceTable({
          name: 'train_engineer',
          columns: [],
        }),
      ],
    });
    expect(code).toMatchSnapshot();
  });
  it('should be able to define types accurately for a query which selects from the table output of a function', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/upsert_jerb.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'upsert_jerb',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [
        new TypeDefinitionOfResourceFunction({
          name: 'upsert_jerb',
          inputs: [],
          output: new TypeDefinitionOfResourceTable({
            name: 'function.output',
            columns: [],
          }),
        }),
      ],
    });
    expect(code).toMatchSnapshot();
  });
  it('should be able to define types correctly for a query which uses an input variable in an or condition (union)', async () => {
    const sql = await extractSqlFromFile({
      filePath: `${__dirname}/../../__test_assets__/queries/find_all_chat_messages_by_thread.lessthan_or_equalsto_or_null.sql`,
    });
    const def = extractTypeDefinitionFromQuerySql({
      name: 'find_all_chat_messages_by_thread',
      path: '__PATH__',
      sql,
    });
    const code = defineTypescriptTypesForQuery({
      definition: def,
      allDefinitions: [
        new TypeDefinitionOfResourceTable({ name: 'chat_thread', columns: [] }),
        new TypeDefinitionOfResourceView({
          name: 'view_chat_message_current',
          selectExpressions: [],
          tableReferences: [],
        }),
      ],
    });
    expect(code).toContain(
      "until: null | SqlViewViewChatMessageCurrent['created_at'];",
    ); // should have union-ed the two types
    console.log(code);
    expect(code).toMatchSnapshot();
  });
});
