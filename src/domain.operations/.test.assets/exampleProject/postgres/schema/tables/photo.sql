CREATE TABLE photo (
  id bigserial NOT NULL,
  uuid uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  url varchar NOT NULL,
  description varchar NULL,
  CONSTRAINT photo_pk PRIMARY KEY (id),
  CONSTRAINT photo_ux1 UNIQUE (url, description)
);
