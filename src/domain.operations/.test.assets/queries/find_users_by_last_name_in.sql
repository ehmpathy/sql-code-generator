SELECT
  u.id,
  CONCAT(u.first_name, " ", u.last_name) as full_name,
  u.age,
  p.number as phone_number,
  up.description
FROM user u
JOIN phone as p ON p.user_id = u.id
JOIN view_user_profile_current up ON up.user_id = u.id
WHERE 1=1
  and u.last_name IN (:candidateLastNames);
