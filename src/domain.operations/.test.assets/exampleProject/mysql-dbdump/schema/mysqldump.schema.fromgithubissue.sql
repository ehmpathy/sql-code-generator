-- per https://github.com/ehmpathy/sql-code-generator/issues/47#issuecomment-1473832676

-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: xcregv2
-- ------------------------------------------------------
-- Server version	10.4.25-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meets`
--

DROP TABLE IF EXISTS `meets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `registrationOpens` datetime DEFAULT NULL,
  `registrationCloses` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_68c082afef70fa9572114da1ae` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meets`
--

LOCK TABLES `meets` WRITE;
/*!40000 ALTER TABLE `meets` DISABLE KEYS */;
INSERT INTO `meets` VALUES (1,'2023-03-14 21:15:07','2023-03-14 21:15:07.866946','Lutheran National XC Meet',NULL,'http://purdue.rivals.com',NULL,NULL),(3,'2023-03-14 21:15:23','2023-03-14 21:15:23.742028','Lutheran National XC Meet = 2023',NULL,'http://purdue.rivals.com',NULL,NULL);
/*!40000 ALTER TABLE `meets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendingusers`
--

DROP TABLE IF EXISTS `pendingusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pendingusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `schoolName` varchar(25) NOT NULL,
  `city` varchar(25) NOT NULL,
  `state` varchar(2) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_dcbe1c9362e2a5954ed37cacb8` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendingusers`
--

LOCK TABLES `pendingusers` WRITE;
/*!40000 ALTER TABLE `pendingusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `pendingusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `races`
--

DROP TABLE IF EXISTS `races`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `raceName` varchar(255) NOT NULL,
  `distance` decimal(4,1) NOT NULL,
  `units` enum('km','mi') NOT NULL,
  `sex` enum('boy','girl') NOT NULL,
  `maxRunners` int(11) NOT NULL DEFAULT -1,
  `maxRunnersPerSchool` int(11) NOT NULL DEFAULT -1,
  `meetId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bdd9289e2e5229c12245e60301` (`raceName`,`meetId`),
  KEY `FK_0d00f6079e05f60cbc597e07a3e` (`meetId`),
  CONSTRAINT `FK_0d00f6079e05f60cbc597e07a3e` FOREIGN KEY (`meetId`) REFERENCES `meets` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `races`
--

LOCK TABLES `races` WRITE;
/*!40000 ALTER TABLE `races` DISABLE KEYS */;
INSERT INTO `races` VALUES (1,'2023-03-14 21:16:05','2023-03-14 21:30:20.000000','Boys 1.0 mile',1.1,'mi','boy',-1,999999,1),(2,'2023-03-14 21:16:18','2023-03-14 21:16:18.157242','Boys 1.5 mile',1.5,'mi','boy',-1,-1,1);
/*!40000 ALTER TABLE `races` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `runners`
--

DROP TABLE IF EXISTS `runners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `runners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `grade` int(11) NOT NULL,
  `sex` enum('boy','girl') NOT NULL,
  `raceId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_643667fbd7cc4845902d8f6f8e` (`schoolId`,`raceId`,`firstName`,`lastName`,`sex`,`grade`),
  KEY `FK_d84623e31d7a37508f3b7280261` (`raceId`),
  CONSTRAINT `FK_9646c5e15b243bd94af980c068c` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_d84623e31d7a37508f3b7280261` FOREIGN KEY (`raceId`) REFERENCES `races` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `runners`
--

LOCK TABLES `runners` WRITE;
/*!40000 ALTER TABLE `runners` DISABLE KEYS */;
INSERT INTO `runners` VALUES (1,'2023-03-14 21:17:53','2023-03-14 21:38:25.000000','GEORGE','OFTHEJUNGLE',3,'boy',1,1),(3,'2023-03-14 21:18:12','2023-03-14 21:18:12.834505','TOMJR','HOFFMAN',8,'boy',1,1);
/*!40000 ALTER TABLE `runners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schools`
--

DROP TABLE IF EXISTS `schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `schoolName` varchar(25) NOT NULL,
  `city` varchar(25) NOT NULL,
  `state` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_311a56dc3afc916619f75a29e2` (`schoolName`,`city`,`state`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schools`
--

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` VALUES (1,'2023-03-14 21:17:44','2023-03-14 21:17:44.980996','ST PETER LUTHERAN','ARLINGTON HEIGHTS','IL');
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `failedLogins` bigint(20) DEFAULT 0,
  `successfulLogins` bigint(20) DEFAULT 0,
  `resetCode` smallint(6) DEFAULT -1,
  `schoolId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  KEY `FK_435e192698a6b7d10849295643d` (`schoolId`),
  CONSTRAINT `FK_435e192698a6b7d10849295643d` FOREIGN KEY (`schoolId`) REFERENCES `schools` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-17  8:13:19
