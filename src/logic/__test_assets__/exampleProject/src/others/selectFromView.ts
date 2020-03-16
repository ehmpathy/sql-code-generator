export const sql = `
-- query_name = select_from_view
SELECT
  u.first_name,
  u.last_name
FROM view_user_name u
WHERE u.id = :userId
`;
