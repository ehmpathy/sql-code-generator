CREATE TABLE `ice_cream` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ingredient_ids_hash` binary(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_ux1` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin
