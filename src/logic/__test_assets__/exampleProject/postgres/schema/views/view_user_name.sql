CREATE OR REPLACE VIEW view_user_name AS
  SELECT
    u.id,
    u.first_name,
    u.last_name
  FROM user u;
