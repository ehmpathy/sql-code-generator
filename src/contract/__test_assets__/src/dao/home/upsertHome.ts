export const sql = `
-- query_name = upsert_home
SELECT upsert_home(
  (select u.id from user u where u.uuid = :userUuid), -- lookup user id for fk by uuid
  :address
) as id;
`.trim();
