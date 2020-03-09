import { extractTypeDefinitionFromSelectExpressionSql } from './extractTypeDefinitionFromSelectExpressionSql';
import { TypeDefinitionOfQuerySelectExpression } from '../../../../model';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';

describe('extractTypeDefinitionFromSelectExpressionSql', () => {
  const examples = [
    {
      sql: 'g.latitude',
      def: new TypeDefinitionOfQuerySelectExpression({
        alias: 'latitude',
        typeReference: new TypeDefinitionReference({
          tableReferencePath: 'g.latitude',
          functionReferencePath: null,
        }),
      }),
    },
    {
      sql: 'g.latitude as lat',
      def: new TypeDefinitionOfQuerySelectExpression({
        alias: 'lat',
        typeReference: new TypeDefinitionReference({
          tableReferencePath: 'g.latitude',
          functionReferencePath: null,
        }),
      }),
    },
    {
      sql: `
upsert_suggestion(
  :suggestionSource,
  :externalId,
  :suggestedIdeaId,
  :status,
  :result
) as id
      `.trim(),
      def: new TypeDefinitionOfQuerySelectExpression({
        alias: 'id',
        typeReference: new TypeDefinitionReference({
          tableReferencePath: null,
          functionReferencePath: 'upsert_suggestion.output',
        }),
      }),
    },
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql.replace(/\s+/g, ' ')}"`, () => {
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
  it('should throw an error if references function and alias is not explicitly defined', () => {
    try {
      extractTypeDefinitionFromSelectExpressionSql({ sql: 'concat(f.name, l.name)' });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toContain(
        'select expressions that reference a function must have an alias defined, per best practice.',
      );
    }
  });
});
