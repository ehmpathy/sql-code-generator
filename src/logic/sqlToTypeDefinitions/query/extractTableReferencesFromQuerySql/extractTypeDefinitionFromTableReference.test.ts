import { TypeDefinitionOfQueryTableReference } from '../../../../domain';
import { extractTypeDefinitionFromTableReference } from './extractTypeDefinitionFromTableReference';

describe('extractTypeDefinitionFromTableReference', () => {
  const examples = [
    {
      sql: 'from user',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'user',
        tableName: 'user',
        functionName: null,
      }),
    },
    {
      sql: 'FROM user u',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'u',
        tableName: 'user',
        functionName: null,
      }),
    },
    {
      sql: 'from cool_db.user as u',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'u',
        tableName: 'user',
        functionName: null,
      }),
    },
    {
      sql: 'JOIN meals AS m ON u.id = m.user_id',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'm',
        tableName: 'meals',
        functionName: null,
      }),
    },
    {
      sql: 'left join cool_db.avatars a on a.id = user.avatar_id',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'a',
        tableName: 'avatars',
        functionName: null,
      }),
    },
    {
      sql: 'JOIN view_user_profile_current up ON up.user_id = u.id',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'up',
        tableName: 'view_user_profile_current',
        functionName: null,
      }),
    },
    {
      sql: 'JOIN user best_friend ON a_friend.id = user.best_friend_id',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'best_friend',
        tableName: 'user',
        functionName: null,
      }),
    },
    {
      sql: 'FROM upsert_job(:name, :description, __SSQ:sub_select_query__, NOW()) as dgv',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'dgv',
        tableName: null,
        functionName: 'upsert_job',
      }),
    },
    {
      sql: 'FROM cool_db.upsert_job(:name, :description, __SSQ:sub_select_query__, NOW()) as dgv',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'dgv',
        tableName: null,
        functionName: 'upsert_job',
      }),
    },
    {
      sql: 'JOIN user ON user.id = phone.user_id',
      def: new TypeDefinitionOfQueryTableReference({
        alias: 'user',
        tableName: 'user',
        functionName: null,
      }),
    },
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql}"`, () => {
      const def = extractTypeDefinitionFromTableReference({ sql: example.sql });
      expect(def).toEqual(example.def);
    });
  });
});
