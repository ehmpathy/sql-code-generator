CREATE OR REPLACE VIEW view_email_current AS
  SELECT
    s.id,
    s.uuid,
    s.external_id,
    s.ses_message_id,
    s.to_address,
    s.from_address,
    s.from_name,
    s.subject,
    s.body,
    v.status,
    s.created_at,
    v.effective_at,
    v.created_at as updated_at
  FROM email s
  JOIN email_cvp cvp ON s.id = cvp.email_id
  JOIN email_version v ON v.id = cvp.email_version_id;
