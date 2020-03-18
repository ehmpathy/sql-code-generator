-- query_name = find_with_subselect_in_select_expressions
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
