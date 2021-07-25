SELECT
  dgv.id, dgv.uuid
FROM upsert_jerb(:ownerUuid, :title, :details, :dueDate) as dgv;
