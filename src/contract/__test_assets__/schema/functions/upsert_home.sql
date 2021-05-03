CREATE FUNCTION `upsert_home`(
  in_user_id varchar(190),
  in_address varchar(190)
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
      AND (user_id = BINARY in_user_id)
      AND (address = BINARY in_address)
  );
  IF (v_static_id IS NULL) THEN -- if entity could not be found originally, create the static entity
    INSERT INTO image
      (uuid, created_at, user_id, address)
      VALUES
      (uuid(), v_created_at, in_user_id, in_address)
    SET v_static_id = (
      SELECT last_insert_id()
    );
  END IF;

  -- return the static entity id
  return v_static_id;
END
