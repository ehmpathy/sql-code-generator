export const sql = `
-- query_name = select_user_with_matching_ice_cream
SELECT
  u.first_name,
  u.last_name,
  (
    SELECT json_build_object(
      'id', ice_cream.id,
      'uuid', ice_cream.uuid,
      'name', ice_cream.name
    ) AS json_build_object
    FROM ice_cream WHERE ice_cream.id = user.id -- in real life, this would be a weird relationship to be interested in
  ) AS ice_cream
FROM user u
WHERE u.id = :userId;
`;
