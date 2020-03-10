CREATE VIEW `view_suggestion_current` AS
  SELECT
    s.id,
    s.uuid,
    s.suggestion_source,
    s.external_id,
    v.status,
    v.result,
    s.created_at,
    v.effective_at,
    v.created_at as updated_at
  FROM suggestion s
  JOIN suggestion_cvp cvp ON s.id = cvp.suggestion_id
  JOIN suggestion_version v ON v.id = cvp.suggestion_version_id;
