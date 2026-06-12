CREATE TABLE ingredient (
  id bigserial PRIMARY KEY,
  uuid uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  name varchar NOT NULL,
  cost numeric(5, 2) NOT NULL,
  CONSTRAINT ingredient_pk PRIMARY KEY (id),
  CONSTRAINT ingredient_ux1 UNIQUE (name)
)
