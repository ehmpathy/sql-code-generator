CREATE TABLE `user` (
  -- meta
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,

  -- static data (in this example... in real life this should not be static)
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,

  -- meta meta
  UNIQUE (`first_name`, `last_name`) -- (in this example... in real life, users should not actually be unique on their name)
) ENGINE = InnoDB;
