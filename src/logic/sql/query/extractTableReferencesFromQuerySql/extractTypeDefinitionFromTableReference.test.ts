import { TypeDefinitionOfQueryTableReference } from '../../../../model';
import { extractTypeDefinitionFromTableReference } from './extractTypeDefinitionFromTableReference';

describe('extractTypeDefinitionFromTableReference', () => {
  const examples = [
    {
      sql: 'from user',
      def: new TypeDefinitionOfQueryTableReference({ alias: 'user', tableName: 'user' }),
    },
    {
      sql: 'FROM user u',
      def: new TypeDefinitionOfQueryTableReference({ alias: 'u', tableName: 'user' }),
    },
    {
      sql: 'from cool_db.user as u',
      def: new TypeDefinitionOfQueryTableReference({ alias: 'u', tableName: 'user' }),
    },
    {
      sql: 'JOIN meals AS m ON u.id = m.user_id',
      def: new TypeDefinitionOfQueryTableReference({ alias: 'm', tableName: 'meals' }),
    },
    {
      sql: 'left join cool_db.avatars a on a.id = user.avatar_id',
      def: new TypeDefinitionOfQueryTableReference({ alias: 'a', tableName: 'avatars' }),
    },
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql}"`, () => {
      const def = extractTypeDefinitionFromTableReference({ sql: example.sql });
      expect(def).toEqual(example.def);
    });
  });
});
