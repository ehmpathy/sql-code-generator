CREATE TABLE user (
  -- meta
  id BIGSERIAL PRIMARY KEY,
  uuid UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  -- static data (in this example... in real life this should not be static)
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,

  -- meta meta
  CONSTRAINT user_ux1 UNIQUE (first_name, last_name) -- (in this example... in real life, users should not actually be unique on their name)
);
CREATE INDEX user_ix ON user USING btree (last_name);
