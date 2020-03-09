import { extractTypeDefinitionFromSelectExpressionSql } from './extractTypeDefinitionFromSelectExpressionSql';
import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';

describe('extractTypeDefinitionFromSelectExpressionSql', () => {
  const examples = [
    {
      sql: 'g.latitude',
      def: new TypeDefinitionOfQuerySelectExpression({ alias: 'latitude', sourcePath: 'g.latitude' }),
    },
    {
      sql: 'g.latitude as lat',
      def: new TypeDefinitionOfQuerySelectExpression({ alias: 'lat', sourcePath: 'g.latitude' }),
    },
    // TODO: sql functions in select expressions; https://github.com/uladkasach/sql-code-generator/issues/3
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql}"`, () => {
      const def = extractTypeDefinitionFromSelectExpressionSql({ sql: example.sql });
      expect(def).toEqual(example.def);
    });
  });
  it('should throw an error if table alias is not explicitly defined', () => {
    try {
      extractTypeDefinitionFromSelectExpressionSql({ sql: 'latitude as lat' });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        'table reference of "latitude" does not have the table alias explicitly defined, violating best practice',
      );
    }
  });
});
