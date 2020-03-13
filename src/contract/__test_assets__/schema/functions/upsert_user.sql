CREATE FUNCTION `upsert_user`(
  in_first_name varchar(190),
  in_last_name varchar(190)
) RETURNS bigint(20)
BEGIN
  -- declarations
  DECLARE v_static_id BIGINT;
  DECLARE v_created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6); -- define a common created_at timestamp to use

  -- find or create the static entity
  SET v_static_id = (
    SELECT id
    FROM image
    WHERE 1=1
      AND (first_name = BINARY in_first_name)
      AND (last_name = BINARY in_last_name)
  );
  IF (v_static_id IS NULL) THEN -- if entity could not be found originally, create the static entity
    INSERT INTO image
      (uuid, created_at, first_name, last_name)
      VALUES
      (uuid(), v_created_at, in_first_name, in_last_name)
    SET v_static_id = (
      SELECT last_insert_id()
    );
  END IF;

  -- return the static entity id
  return v_static_id;
END
