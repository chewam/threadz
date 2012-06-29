# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.44)
# Database: threadz
# Generation Time: 2012-06-29 01:34:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `threadId` int(11) NOT NULL,
  `text` text NOT NULL,
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `userId`, `threadId`, `text`, `creationDate`)
VALUES
	(1,21,31,'fdsfds','2012-06-27 03:36:49'),
	(2,21,31,'fdsfdsfdsfds','2012-06-27 03:38:00'),
	(3,21,31,'fdsfdsfds','2012-06-27 03:49:40'),
	(4,21,31,'fdsfdsfds','2012-06-27 03:58:24'),
	(5,21,31,'hfhgfhfghgf','2012-06-27 03:59:11'),
	(6,21,31,'fdsfqsfdsq','2012-06-27 05:27:04'),
	(7,21,31,'cxvcxvcx','2012-06-27 05:28:35'),
	(8,21,31,'n,,hjgkhkjhkjh','2012-06-27 05:30:02'),
	(9,21,31,'vvsdfdsfds','2012-06-27 05:36:25'),
	(10,21,31,'fdfdqdq','2012-06-27 05:36:56'),
	(11,21,31,'gfdgfsd','2012-06-27 05:38:17'),
	(12,21,31,'dssds','2012-06-27 05:43:21'),
	(13,21,31,'vsfdsfds','2012-06-27 05:50:11'),
	(14,21,31,'fdsfdfds','2012-06-27 05:51:11'),
	(15,21,31,'Hello :)','2012-06-27 06:10:15'),
	(16,21,31,'Hey','2012-06-27 06:11:38'),
	(17,21,31,'coucou','2012-06-27 06:19:58'),
	(18,21,31,'yopyop','2012-06-27 06:26:10'),
	(19,21,31,'ouais tranquille :)','2012-06-27 06:26:51'),
	(20,22,31,'so ?','2012-06-27 06:29:23'),
	(21,21,31,'Ben tout va bien pour le moment ;)','2012-06-27 06:29:38'),
	(22,22,31,'ok cool &éà$¥€','2012-06-27 06:30:14'),
	(23,21,31,'yoyop','2012-06-28 17:30:37'),
	(24,21,31,'hiiii','2012-06-28 17:36:07'),
	(25,21,31,'wwww','2012-06-28 17:44:18'),
	(26,22,31,'xxxxxx','2012-06-28 17:44:26'),
	(27,23,31,'salut les mecs !','2012-06-28 17:48:52'),
	(28,22,31,'yop mon reunwa !!!','2012-06-29 00:00:22'),
	(29,21,31,'c\'est trop de la balle, nan ?','2012-06-29 00:01:00'),
	(30,22,31,'ouais faut avouer que c\'est pas mal du tout :)','2012-06-29 00:10:04'),
	(31,22,31,'fjjgh','2012-06-29 00:14:25'),
	(32,22,31,'hjgff','2012-06-29 00:19:07'),
	(33,21,32,'The first message !','2012-06-29 00:22:15'),
	(34,21,32,'The second message !','2012-06-29 00:25:10'),
	(35,21,32,'sfdsfdsfds','2012-06-29 00:33:35'),
	(36,21,33,'The first message of this thread...','2012-06-29 00:34:07'),
	(37,21,63,'first message on ccc thread','2012-06-29 01:53:10'),
	(38,21,65,'a nice massage on toto thread','2012-06-29 01:59:09');

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table threads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `threads`;

CREATE TABLE `threads` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `userId` int(11) NOT NULL,
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;

INSERT INTO `threads` (`id`, `name`, `userId`, `creationDate`)
VALUES
	(31,'Thread 1 of user 21',21,'2012-06-25 19:24:56'),
	(32,'Thread 2 of user 21',21,'2012-06-25 19:24:56'),
	(33,'Thread 3 of user 21',21,'2012-06-25 19:24:56'),
	(34,'Thread 1 of user 22',22,'2012-06-25 19:24:56'),
	(35,'Thread 2 of user 22',22,'2012-06-25 19:24:56'),
	(36,'Thread 3 of user 22',22,'2012-06-25 19:24:56'),
	(37,'Thread 1 of user 23',23,'2012-06-25 19:24:56'),
	(38,'Thread 2 of user 23',23,'2012-06-25 19:24:56'),
	(39,'Thread 3 of user 23',23,'2012-06-25 19:24:56'),
	(40,'Thread 1 of user 24',24,'2012-06-25 19:24:56'),
	(41,'Thread 2 of user 24',24,'2012-06-25 19:24:56'),
	(42,'Thread 3 of user 24',24,'2012-06-25 19:24:56'),
	(43,'Thread 1 of user 25',25,'2012-06-25 19:24:56'),
	(44,'Thread 2 of user 25',25,'2012-06-25 19:24:56'),
	(45,'Thread 3 of user 25',25,'2012-06-25 19:24:56'),
	(46,'Thread 1 of user 26',26,'2012-06-25 19:24:56'),
	(47,'Thread 2 of user 26',26,'2012-06-25 19:24:56'),
	(48,'Thread 3 of user 26',26,'2012-06-25 19:24:56'),
	(49,'Thread 1 of user 27',27,'2012-06-25 19:24:56'),
	(50,'Thread 2 of user 27',27,'2012-06-25 19:24:56'),
	(51,'Thread 3 of user 27',27,'2012-06-25 19:24:56'),
	(52,'Thread 1 of user 28',28,'2012-06-25 19:24:56'),
	(53,'Thread 2 of user 28',28,'2012-06-25 19:24:56'),
	(54,'Thread 3 of user 28',28,'2012-06-25 19:24:56'),
	(55,'Thread 1 of user 29',29,'2012-06-25 19:24:56'),
	(56,'Thread 2 of user 29',29,'2012-06-25 19:24:56'),
	(57,'Thread 3 of user 29',29,'2012-06-25 19:24:56'),
	(58,'Thread 1 of user 30',30,'2012-06-25 19:24:56'),
	(59,'Thread 2 of user 30',30,'2012-06-25 19:24:56'),
	(60,'Thread 3 of user 30',30,'2012-06-25 19:24:56'),
	(61,'xxxx',21,'2012-06-29 01:45:43'),
	(62,'yyyy',21,'2012-06-29 01:51:54'),
	(63,'ccc',21,'2012-06-29 01:52:44'),
	(64,'ccc',21,'2012-06-29 01:52:55'),
	(65,'toto',21,'2012-06-29 01:57:27');

/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `creationDate`)
VALUES
	(21,'user1@threadz.com','demo','2012-06-25 19:24:56'),
	(22,'user2@threadz.com','demo','2012-06-25 19:24:56'),
	(23,'user3@threadz.com','demo','2012-06-25 19:24:56'),
	(24,'user4@threadz.com','demo','2012-06-25 19:24:56'),
	(25,'user5@threadz.com','demo','2012-06-25 19:24:56'),
	(26,'user6@threadz.com','demo','2012-06-25 19:24:56'),
	(27,'user7@threadz.com','demo','2012-06-25 19:24:56'),
	(28,'user8@threadz.com','demo','2012-06-25 19:24:56'),
	(29,'user9@threadz.com','demo','2012-06-25 19:24:56'),
	(30,'user10@threadz.com','demo','2012-06-25 19:24:56'),
	(31,'gary@chewam.com','demo','2012-06-26 00:26:30');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userThreads
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userThreads`;

CREATE TABLE `userThreads` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `threadId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isGranted` tinyint(4) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(4) NOT NULL DEFAULT '0',
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `userThreads` WRITE;
/*!40000 ALTER TABLE `userThreads` DISABLE KEYS */;

INSERT INTO `userThreads` (`id`, `threadId`, `userId`, `isGranted`, `isAdmin`, `creationDate`)
VALUES
	(1,31,21,1,1,'2012-06-25 19:24:56'),
	(2,32,21,1,1,'2012-06-25 19:24:56'),
	(3,33,21,1,1,'2012-06-25 19:24:56'),
	(4,34,22,1,1,'2012-06-25 19:24:56'),
	(5,35,22,1,1,'2012-06-25 19:24:56'),
	(6,36,22,1,1,'2012-06-25 19:24:56'),
	(7,37,23,1,1,'2012-06-25 19:24:56'),
	(8,38,23,1,1,'2012-06-25 19:24:56'),
	(9,39,23,1,1,'2012-06-25 19:24:56'),
	(10,40,24,1,1,'2012-06-25 19:24:56'),
	(11,41,24,1,1,'2012-06-25 19:24:56'),
	(12,42,24,1,1,'2012-06-25 19:24:56'),
	(13,43,25,1,1,'2012-06-25 19:24:56'),
	(14,44,25,1,1,'2012-06-25 19:24:56'),
	(15,45,25,1,1,'2012-06-25 19:24:56'),
	(16,46,26,1,1,'2012-06-25 19:24:56'),
	(17,47,26,1,1,'2012-06-25 19:24:56'),
	(18,48,26,1,1,'2012-06-25 19:24:56'),
	(19,49,27,1,1,'2012-06-25 19:24:56'),
	(20,50,27,1,1,'2012-06-25 19:24:56'),
	(21,51,27,1,1,'2012-06-25 19:24:56'),
	(22,52,28,1,1,'2012-06-25 19:24:56'),
	(23,53,28,1,1,'2012-06-25 19:24:56'),
	(24,54,28,1,1,'2012-06-25 19:24:56'),
	(25,55,29,1,1,'2012-06-25 19:24:56'),
	(26,56,29,1,1,'2012-06-25 19:24:56'),
	(27,57,29,1,1,'2012-06-25 19:24:56'),
	(28,58,30,1,1,'2012-06-25 19:24:56'),
	(29,59,30,1,1,'2012-06-25 19:24:56'),
	(30,60,30,1,1,'2012-06-25 19:24:56'),
	(31,31,22,0,0,'2012-06-25 19:24:56'),
	(32,31,23,1,0,'2012-06-25 19:24:56'),
	(33,62,21,1,1,'2012-06-29 01:51:54'),
	(34,63,21,1,1,'2012-06-29 01:52:44'),
	(35,64,21,1,1,'2012-06-29 01:52:55'),
	(36,65,21,1,1,'2012-06-29 01:57:27');

/*!40000 ALTER TABLE `userThreads` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
