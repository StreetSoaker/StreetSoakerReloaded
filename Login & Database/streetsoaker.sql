-- phpMyAdmin SQL Dump
-- version 4.0.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 10, 2013 at 02:22 PM
-- Server version: 5.5.34-0ubuntu0.13.10.1
-- PHP Version: 5.5.3-1ubuntu2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `streetsoaker`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'AKA gameId',
  `private` tinyint(1) NOT NULL COMMENT 'Is is a private game?',
  `password` varchar(64) DEFAULT NULL COMMENT 'If the game is private, use password',
  `gameMode` tinyint(1) NOT NULL COMMENT 'The gamemode (FFA)',
  `name` varchar(50) NOT NULL COMMENT 'The name of the game',
  `coorLat` float NOT NULL COMMENT 'The latitude coordinates',
  `coorLong` float NOT NULL COMMENT 'The longitude coordinates',
  `radius` int(11) NOT NULL COMMENT 'The radius in which the game can be played',
  `maxPlayers` int(11) NOT NULL,
  `startDate` datetime NOT NULL COMMENT 'When the game will start',
  `endDate` datetime DEFAULT NULL COMMENT 'The date and time when the game has ended',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `private`, `password`, `gameMode`, `name`, `coorLat`, `coorLong`, `radius`, `maxPlayers`, `startDate`, `endDate`) VALUES
(15, 0, NULL, 1, 'This is my life! Its now or never!', 2.12344, 51.1235, 300, 42, '2013-11-02 04:14:11', NULL),
(16, 0, NULL, 1, 'This is my life! Its now or never!', 2.12344, 51.1235, 300, 42, '2013-11-02 04:14:53', NULL),
(17, 0, NULL, 1, 'This is my life! Its now or never!', 2.12344, 51.1235, 300, 42, '2013-11-02 04:16:36', NULL),
(18, 0, NULL, 1, 'Game #021213_3', 2.12344, 51.1235, 300, 42, '2013-11-02 04:17:35', NULL),
(19, 0, NULL, 1, 'Game #021213_4', 2.12344, 51.1235, 300, 42, '2013-11-02 04:22:38', NULL),
(20, 1, NULL, 1, 'Game #021213_5', 2.12344, 51.1235, 300, 42, '2013-11-02 04:58:28', NULL),
(21, 1, NULL, 1, 'Game #021213_1', 2.12344, 51.1235, 300, 42, '2013-11-02 04:59:02', NULL),
(22, 1, NULL, 1, '0', 2.12344, 51.1235, 300, 42, '2013-11-09 05:32:08', NULL),
(23, 1, NULL, 1, '0', 2.12344, 51.1235, 300, 42, '2013-11-09 05:32:17', NULL),
(24, 1, NULL, 1, 'Testing', 2.12344, 51.1235, 300, 42, '2013-11-09 05:33:08', NULL),
(25, 1, NULL, 1, '21', 2.12344, 51.1235, 300, 42, '2013-11-09 05:46:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hints`
--

CREATE TABLE IF NOT EXISTS `hints` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Hint ID',
  `userId` int(11) NOT NULL COMMENT 'To check which user wants a hint',
  `count` tinyint(4) NOT NULL COMMENT 'The amount of clicks the user has had.',
  `given` tinyint(4) NOT NULL COMMENT 'If the hint has been given or not',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL COMMENT 'Player ID',
  `userId` int(11) NOT NULL COMMENT 'The userId of the user who is playing',
  `gameId` int(11) NOT NULL COMMENT 'The gameId of the game that the user is playing in',
  `guest` int(11) NOT NULL COMMENT 'Check if the player is a guest or a player',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `gameId` (`gameId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `userId`, `gameId`, `guest`) VALUES
(0, 2, 16, 1);

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE IF NOT EXISTS `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Statistic ID',
  `gameId` int(11) NOT NULL COMMENT 'For which game are the statistics?',
  `userId` int(11) NOT NULL COMMENT 'For which user are the statistics?',
  `kills` int(11) NOT NULL COMMENT 'The amount of kills during a game',
  `deaths` int(11) NOT NULL COMMENT 'The amount of deaths during a game',
  `startTime` time NOT NULL COMMENT 'The time when the game started',
  `endTime` time NOT NULL COMMENT 'The time when the game ended',
  PRIMARY KEY (`id`),
  KEY `gameId` (`gameId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'AKA userId',
  `email` varchar(70) DEFAULT NULL COMMENT 'The email of the user',
  `oauthUid` varchar(200) DEFAULT NULL COMMENT 'The user id which is given from oAuth',
  `oauthProvider` varchar(200) DEFAULT NULL COMMENT 'The provider from which the user want to log in',
  `name` varchar(100) DEFAULT NULL COMMENT 'The name of the user',
  `displayName` varchar(100) NOT NULL COMMENT 'The name that will be shown to the other players',
  `twitterOauthToken` varchar(200) DEFAULT NULL COMMENT 'The oAuth token from twitter',
  `twitterOauthTokenSecret` varchar(200) DEFAULT NULL COMMENT 'the oAuth token secret from twitter',
  `lastLogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `oauthUid`, `oauthProvider`, `name`, `displayName`, `twitterOauthToken`, `twitterOauthTokenSecret`, `lastLogin`) VALUES
(2, 'matiski@hotmail.com', '100001084953435', 'facebook', 'Mathijs van den Berkmortel', 'Mathijs van den Berkmortel', NULL, NULL, '2013-12-06 10:17:51'),
(4, '', '2206881036', 'twitter', 'Mathijs', 'Mathijs', NULL, NULL, '2013-12-09 10:21:51'),
(5, '', '250846250', 'twitter', 'Robin Valk', 'Robin Valk', NULL, NULL, '2013-12-09 10:36:20'),
(6, 'valk3@hotmail.com', '100000575024862', 'facebook', 'Robin Valk', 'Robin Valk', NULL, NULL, '2013-12-09 10:38:11');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hints`
--
ALTER TABLE `hints`
  ADD CONSTRAINT `hints_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `statistics_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
