import { extractTypeDefinitionFromSelectExpressionSql } from './extractTypeDefinitionFromSelectExpressionSql';
import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';

describe('extractTypeDefinitionFromSelectExpressionSql', () => {
  const examples = [
    {
      sql: 'latitude',
      def: new TypeDefinitionOfQuerySelectExpression({ name: 'latitude', sourcePath: 'latitude' }),
    },
    {
      sql: 'g.latitude',
      def: new TypeDefinitionOfQuerySelectExpression({ name: 'latitude', sourcePath: 'g.latitude' }),
    },
    {
      sql: 'g.latitude as lat',
      def: new TypeDefinitionOfQuerySelectExpression({ name: 'lat', sourcePath: 'g.latitude' }),
    },
    // TODO: support common sql functions in select expressions; https://github.com/uladkasach/sql-code-generator/issues/3
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql}"`, () => {
      const def = extractTypeDefinitionFromSelectExpressionSql({ sql: example.sql });
      expect(def).toEqual(example.def);
    });
  });
});
