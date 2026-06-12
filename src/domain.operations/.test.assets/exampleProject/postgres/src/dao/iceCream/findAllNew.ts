export const sql = `
-- query_name = find_all_new_ice_cream
SELECT
  s.id,
  s.uuid,
  s.name,
  (
    SELECT array_agg(ice_cream_to_ingredient.ingredient_id ORDER BY ice_cream_to_ingredient.ingredient_id)
    FROM ice_cream_to_ingredient WHERE ice_cream_to_ingredient.ice_cream_id = s.id
  ) as ingredient_ids,
  s.created_at
FROM ice_cream s
WHERE s.created_at > DATE_SUB(NOW(), INTERVAL 7 day) -- new if less than 7 days old
LIMIT :limit
;
`.trim();
