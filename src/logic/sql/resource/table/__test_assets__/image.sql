CREATE TABLE `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uuid` char(36) COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `url` varchar(190) COLLATE utf8mb4_bin NOT NULL,
  `caption` varchar(190) COLLATE utf8mb4_bin DEFAULT NULL,
  `credit` varchar(190) COLLATE utf8mb4_bin, -- note: we strip "DEFAULT NULL" here for testing
  `alt_text` varchar(190) COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_ux1` (`url`,`caption`,`credit`,`alt_text`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin
