export const sql = `
  select
    u.id,
    concat(first_name, last_name) as full_name
  from user u
  where 1=1
    and name = :name;
`;
