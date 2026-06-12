  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `suggestion_id` bigint(20) NOT NULL,
  `effective_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `status` enum('PENDING','REVIEWED') COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `suggestion_version_ux1` (`suggestion_id`,`effective_at`,`created_at`),
  KEY `suggestion_version_fk0` (`suggestion_id`),
  CONSTRAINT `suggestion_version_fk0` FOREIGN KEY (`suggestion_id`) REFERENCES `suggestion` (`id`)
