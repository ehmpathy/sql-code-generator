SELECT
  p.id,
  p.uuid,
  (
    SELECT count(1) from work w where w.providerUuid = p.uuid
  ) as work_count
FROM provider p
