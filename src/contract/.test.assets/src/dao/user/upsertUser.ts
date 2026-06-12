export const sql = `
-- query_name = upsert_user
SELECT upsert_user(
  :firstName,
  :lastName
) as id;
`.trim();
