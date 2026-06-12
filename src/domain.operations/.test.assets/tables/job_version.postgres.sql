CREATE TABLE job_version (
  id bigserial NOT NULL,
  job_id bigint NOT NULL,
  effective_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  location_id bigint NOT NULL,
  photo_ids_hash bytea NOT NULL,
  CONSTRAINT job_version_pk PRIMARY KEY (id),
  CONSTRAINT job_version_ux1 UNIQUE (job_id, effective_at, created_at),
  CONSTRAINT job_version_fk0 FOREIGN KEY (job_id) REFERENCES job (id),
  CONSTRAINT job_version_fk1 FOREIGN KEY (location_id) REFERENCES location (id)
);
CREATE INDEX job_version_fk0_ix ON job_version USING btree (job_id);
CREATE INDEX job_version_fk1_ix ON job_version USING btree (location_id);
