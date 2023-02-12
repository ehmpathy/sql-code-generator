import { extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings } from './extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings';

describe('extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings', () => {
  it('should not do anything if its just a string', () => {
    const sqlParts = ['select u.id from user u where u.id = :id'];
    const { referencedSqlParts, references } =
      extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings({ sqlParts });
    expect(referencedSqlParts).toEqual(sqlParts);
    expect(references.length).toEqual(0);
  });
  it('should extract reference if one of the sql parts is a subquery', () => {
    const sqlParts = [
      `
SELECT
  s.id,
  s.uuid,
  s.name,
`.trim(),
      `
(
  SELECT GROUP_CONCAT(ice_cream_to_ingredient.ingredient_id ORDER BY ice_cream_to_ingredient.ingredient_id)
  FROM ice_cream_to_ingredient WHERE ice_cream_to_ingredient.ice_cream_id = s.id
)
`.trim(),
      `
  as ingredient_ids,
  s.created_at
FROM ice_cream s
;
  `.trim(),
    ];
    const { referencedSqlParts, references } =
      extractAndTokenizeSubqueryReferencesInArrayOfSqlStrings({ sqlParts });

    // should have got the reference
    expect(references.length).toEqual(1);
    expect(references[0].sql).toEqual(sqlParts[1]);

    // it should have replaced the sql in the referenced sql parts for the subquery
    expect(referencedSqlParts[1]).toMatch(/__SSQ:[\w-]+__/);

    // it should have not touched the remaining sql
    expect(referencedSqlParts[0]).toEqual(sqlParts[0]);
    expect(referencedSqlParts[2]).toEqual(sqlParts[2]);
  });
});
