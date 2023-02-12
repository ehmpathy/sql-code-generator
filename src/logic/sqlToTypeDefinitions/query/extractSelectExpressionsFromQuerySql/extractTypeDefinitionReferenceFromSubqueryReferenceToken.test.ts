import { TypeDefinitionReference } from '../../../../domain';
import { SqlSubqueryReference } from '../../../../domain/objects/SqlSubqueryReference';
import { extractTypeDefinitionReferenceFromSubqueryReferenceToken } from './extractTypeDefinitionReferenceFromSubqueryReferenceToken';

describe('extractTypeDefinitionReferenceFromSubqueryReferenceToken', () => {
  it('should return the reference type of the only select expression of the correct subquery', () => {
    const ref = extractTypeDefinitionReferenceFromSubqueryReferenceToken({
      subqueryReferenceToken: '__SSQ:70bebe49-fafa-4d0d-a457-e063b40037f1__',
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
    });
    expect(ref).toEqual(
      new TypeDefinitionReference({
        functionReferencePath: 'group_concat.output',
        tableReferencePath: null,
      }),
    );
  });
});
