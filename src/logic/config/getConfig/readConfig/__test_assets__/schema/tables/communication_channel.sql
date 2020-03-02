-- ----------------------------------------
-- create communication channel table
-- ----------------------------------------
CREATE TABLE `communication_channel` (
  -- meta
  `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `uuid` VARCHAR(36) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,

  -- static data
  `type` ENUM('APP', 'SMS', 'EMAIL') NOT NULL, -- e.g., "how do we send this"
  `address` VARCHAR(36) NOT NULL, -- e.g., "where do we send this"

  -- meta meta
  UNIQUE (`type`, `address`) -- type + address uniquely identify a communication channel
) ENGINE = InnoDB;
