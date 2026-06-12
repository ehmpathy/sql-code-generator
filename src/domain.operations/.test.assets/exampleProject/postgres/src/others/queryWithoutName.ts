export const sql = `
SELECT
  u.id
FROM
  user u
WHERE u.id = :id
`.trim();
