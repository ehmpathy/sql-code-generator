select
  id,
  url,
  caption,
  alt_text,
  credit
from image
where id = :id
