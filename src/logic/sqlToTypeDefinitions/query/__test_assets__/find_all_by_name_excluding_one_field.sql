-- query_name = find_all_by_name
SELECT
  u.id,
  u.first_name
  -- concat(u.first_name, u.last_name) as full_name; TODO: support mysql native functions https://github.com/uladkasach/sql-code-generator/issues/3
FROM user u
WHERE u.first_name = :firstName
