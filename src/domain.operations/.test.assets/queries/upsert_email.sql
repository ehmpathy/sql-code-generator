  -- query_name = upsert_email
  SELECT
    dgv.id, dgv.uuid
  FROM upsert_email(
    :externalId,
    :sesMessageId,
    :toReceiverId,
    :fromSenderId,
    :subject,
    :body,
    :status
  ) as dgv;
