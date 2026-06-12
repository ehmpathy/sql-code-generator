CREATE OR REPLACE FUNCTION get_answer_to_life()
RETURNS int
LANGUAGE plpgsql
AS $$
  BEGIN
    RETURN 42;
  END;
$$
