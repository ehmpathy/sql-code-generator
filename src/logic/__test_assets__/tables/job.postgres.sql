CREATE TABLE job (
  id bigserial NOT NULL,
  uuid uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status varchar NOT NULL,
  CONSTRAINT job_pk PRIMARY KEY (id),
  CONSTRAINT job_ux1 UNIQUE (uuid),
  CONSTRAINT job_status_check CHECK (status IN ('QUEUED', 'ATTEMPTED', 'FULFILLED', 'FAILED', 'CANCELED'))
);
