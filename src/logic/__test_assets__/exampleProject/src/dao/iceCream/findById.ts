export const sql = `
-- query_name = find_ice_cream_by_id
SELECT
  s.id,
  s.uuid,
  s.name,
  (
    SELECT GROUP_CONCAT(ice_cream_to_ingredient.ingredient_id ORDER BY ice_cream_to_ingredient.ingredient_id)
    FROM ice_cream_to_ingredient WHERE ice_cream_to_ingredient.ice_cream_id = s.id
  ) as ingredient_ids,
  s.created_at
FROM ice_cream s
;
`.trim();
