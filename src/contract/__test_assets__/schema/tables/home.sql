CREATE TABLE `home` (
  -- meta
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,

  -- static data (in this example... in real life this should not be static)
  `address` VARCHAR(255) NOT NULL, -- in this example, an address is just a string
  `user_id` VARCHAR(255) NOT NULL, -- in this example, homes can never change hands

  -- meta meta
  UNIQUE (`address`),
  CONSTRAINT home_fk_1 FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE = InnoDB;
