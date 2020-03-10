select
  i.id,
  i.url,
  i.caption,
  i.alt_text,
  i.credit
from image i
where i.id = :id

