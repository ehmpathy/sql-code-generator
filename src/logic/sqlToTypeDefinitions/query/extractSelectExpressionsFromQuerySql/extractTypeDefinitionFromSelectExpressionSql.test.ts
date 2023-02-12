import { TypeDefinitionOfQuerySelectExpression } from '../../../../domain';
import { SqlSubqueryReference } from '../../../../domain/objects/SqlSubqueryReference';
import { TypeDefinitionReference } from '../../../../model/valueObjects/TypeDefinitionReference';
import { extractTypeDefinitionFromSelectExpressionSql } from './extractTypeDefinitionFromSelectExpressionSql';

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
    {
      sql: `
__SSQ:70bebe49-fafa-4d0d-a457-e063b40037f1__ as ingredient_ids
      `.trim(),
      subqueries: [
        new SqlSubqueryReference({
          id: '70bebe49-fafa-4d0d-a457-e063b40037f1',
          sql: `
          (
            SELECT GROUP_CONCAT(ice_cream_to_ingredient.ingredient_id ORDER BY ice_cream_to_ingredient.ingredient_id)
            FROM ice_cream_to_ingredient WHERE ice_cream_to_ingredient.ice_cream_id = s.id
          )
          `.trim(),
        }),
      ],
      def: new TypeDefinitionOfQuerySelectExpression({
        alias: 'ingredient_ids',
        typeReference: new TypeDefinitionReference({
          tableReferencePath: null,
          functionReferencePath: 'group_concat.output',
        }),
      }),
    },
  ];
  examples.forEach((example) => {
    it(`should be able to determine types accurately for this example: "${example.sql.replace(
      /\s+/g,
      ' ',
    )}"`, () => {
      const def = extractTypeDefinitionFromSelectExpressionSql({
        sql: example.sql,
        subqueries: example.subqueries ?? [],
        inASubquery: false,
      });
      expect(def).toEqual(example.def);
    });
  });
  it('should throw an error if table alias is not explicitly defined', () => {
    try {
      extractTypeDefinitionFromSelectExpressionSql({
        sql: 'latitude as lat',
        subqueries: [],
        inASubquery: false,
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toEqual(
        'table reference of "latitude" does not have the table alias explicitly defined, violating best practice',
      );
    }
  });
  it('should throw an error if references function and alias is not explicitly defined', () => {
    try {
      extractTypeDefinitionFromSelectExpressionSql({
        sql: 'concat(f.name, l.name)',
        subqueries: [],
        inASubquery: false,
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error.message).toContain(
        'select expressions that reference a function must have an alias defined, per best practice.',
      );
    }
  });
  it('should not throw an error if references function and alias is not explicitly defined, but is in subquery', () => {
    const def = extractTypeDefinitionFromSelectExpressionSql({
      sql: 'concat(f.name, l.name)',
      subqueries: [],
      inASubquery: true,
    });
    expect(def).toEqual(
      new TypeDefinitionOfQuerySelectExpression({
        alias: '__subquery_placeholder_name__', // this wont be used anyway, so we're comfortable with it being a "placeholder"
        typeReference: new TypeDefinitionReference({
          tableReferencePath: null,
          functionReferencePath: 'concat.output',
        }),
      }),
    );
  });
});
