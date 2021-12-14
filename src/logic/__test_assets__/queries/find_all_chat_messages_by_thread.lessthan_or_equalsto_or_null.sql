  -- query_name = find_all_chat_message_by_thread
  SELECT
    chat_message.id,
    chat_message.uuid,
    (
      SELECT chat_thread.uuid
      FROM chat_thread WHERE chat_thread.id = chat_message.thread_id
    ) AS thread_uuid,
    chat_message.sent_at,
    chat_message.text
  FROM view_chat_message_current AS chat_message
  WHERE 1=1
    AND chat_message.thread_id = (SELECT id FROM chat_thread WHERE chat_thread.uuid = :threadUuid)
    AND (:until is null OR chat_message.created_at <= :until)
  ORDER BY chat_message.sent_at DESC -- latest first
  LIMIT :limit;
