SELECT
  train.id,
  train.uuid,
  (
    SELECT json_build_object(
      'id', geocode.id,
      'uuid', geocode.uuid,
      'latitude', geocode.latitude,
      'longitude', geocode.longitude
    ) AS json_build_object
    FROM geocode WHERE geocode.id = train.home_station_geocode_id
  ) AS home_station_geocode,
  train.combination_id,
  (
    SELECT COALESCE(array_agg(locomotive.uuid ORDER BY locomotive_ref.array_order_index), array[]::uuid[]) AS array_agg
    FROM locomotive
    JOIN unnest(train.locomotive_ids) WITH ORDINALITY
      AS locomotive_ref (id, array_order_index)
      ON locomotive.id = locomotive_ref.id
  ) AS locomotive_uuids,
  (
    SELECT COALESCE(array_agg(carriage.uuid ORDER BY carriage_ref.array_order_index), array[]::uuid[]) AS array_agg
    FROM carriage
    JOIN unnest(train.carriage_ids) WITH ORDINALITY
      AS carriage_ref (id, array_order_index)
      ON carriage.id = carriage_ref.id
  ) AS carriage_uuids,
  (
    SELECT COALESCE(array_agg(train_engineer.uuid ORDER BY train_engineer_ref.array_order_index), array[]::uuid[]) AS array_agg
    FROM train_engineer
    JOIN unnest(train.engineer_ids) WITH ORDINALITY
      AS train_engineer_ref (id, array_order_index)
      ON train_engineer.id = train_engineer_ref.id
  ) AS engineer_uuids,
  (
    SELECT train_engineer.uuid
    FROM train_engineer WHERE train_engineer.id = train.lead_engineer_id
  ) AS lead_engineer_uuid,
  train.status
FROM view_train_current AS train
WHERE train.uuid = :uuid;
