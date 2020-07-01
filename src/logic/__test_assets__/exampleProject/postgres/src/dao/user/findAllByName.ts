export const sql = `
-- query_name = find_all_by_name
SELECT
  u.id,
  u.first_name
  concat(u.first_name, u.last_name) as full_name
FROM user u
WHERE u.first_name = :firstName
`.trim();
