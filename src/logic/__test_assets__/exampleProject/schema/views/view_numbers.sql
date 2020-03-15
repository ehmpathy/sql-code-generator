CREATE VIEW `view_user_name` AS
  SELECT
    u.first_name,
    u.last_name
  FROM user u;
