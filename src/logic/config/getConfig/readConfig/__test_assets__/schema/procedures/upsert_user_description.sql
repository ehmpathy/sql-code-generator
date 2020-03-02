/*
  this is an example procedure with an example comment at the top, just to prove that we can extrac thte name and type from it
*/
CREATE PROCEDURE upsert_user_description(
  IN in_from_user_id BIGINT,
  IN in_first_name VARCHAR(255),
  IN in_last_name VARCHAR(255),
  IN in_phone_channel_id BIGINT
)
BEGIN
  -- ----------------------------------------
  -- DECLARATIONS
  -- ----------------------------------------
  DECLARE v_data_hash BINARY(20);
  DECLARE v_entity_exists BOOLEAN DEFAULT false;

  -- -----------------------------------------
  -- UPSERT RECORD
  -- -----------------------------------------
  -- calculate the hash
  SET v_data_hash = UNHEX( --  get the binary
    SHA( -- of the hex hash
      CONCAT_WS( -- of a string combining all non-null values
        ':',
        in_from_user_id,
        in_first_name,
        in_last_name,
        in_phone_channel_id
      )
    )
  );

  -- ... do more stuff
END;
