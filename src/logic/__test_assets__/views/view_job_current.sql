CREATE OR REPLACE VIEW view_job_current AS
  SELECT
    s.id,
    s.uuid,
    s.title,
    s.status,
    s.description,
    v.location_id,
    (
      SELECT array_agg(job_version_to_photo.photo_id ORDER BY job_version_to_photo.array_order_index) as array_agg
      FROM job_version_to_photo WHERE job_version_to_photo.job_version_id = v.id
    ) as photo_ids,
    s.created_at,
    v.effective_at,
    v.created_at as updated_at
  FROM job s
  JOIN job_cvp cvp ON s.id = cvp.job_id
  JOIN job_version v ON v.id = cvp.job_version_id;
