SELECT
  user.id,
  CONCAT(user.first_name, " ", user.last_name) as full_name,
  user.age,
  phone.number as phone_number,
  view_user_profile_current.description
FROM user
JOIN phone ON phone.user_id = user.id
JOIN view_user_profile_current ON view_user_profile_current.user_id = user.id
WHERE 1=1
  and user.last_name = :lastName;
