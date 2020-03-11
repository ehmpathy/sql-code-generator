export const query = `
-- query_name = find_all_by_name
SELECT
  u.id,
  u.first_name,
  concat(u.first_name, u.last_name) as full_name
FROM users u
WHERE name = :name
`.trim();
