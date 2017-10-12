-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-10-05 11:32:00
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `morgan`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE `account` (
  `sha_value` varchar(255) NOT NULL,
  `ac_id` varchar(8) NOT NULL,
  `ac_short_name` varchar(16) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `term_date` datetime DEFAULT NULL,
  `inception_date` datetime DEFAULT NULL,
  `ac_region` varchar(2) DEFAULT NULL,
  `ac_sub_region` varchar(2) DEFAULT NULL,
  `cod_country_domicile` varchar(2) DEFAULT NULL,
  `liq_method` varchar(2) DEFAULT NULL,
  `contracting_entity` varchar(4) DEFAULT NULL,
  `mgn_entity` varchar(4) DEFAULT NULL,
  `ac_legal_name` varchar(150) DEFAULT NULL,
  `manager_name` varchar(80) DEFAULT NULL,
  `cod_ccy_base` varchar(3) DEFAULT NULL,
  `longname` varchar(50) DEFAULT NULL,
  `mandate_id` varchar(20) DEFAULT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `custodian_name` varchar(60) DEFAULT NULL,
  `sub_mandate_id` varchar(20) DEFAULT NULL,
  `transfer_agent_name` varchar(30) DEFAULT NULL,
  `trust_bank` varchar(15) DEFAULT NULL,
  `re_trust_bank` varchar(15) DEFAULT NULL,
  `last_updated_by` varchar(8) DEFAULT NULL,
  `last_approved_by` varchar(8) DEFAULT NULL,
  `last_update_date` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ac_benchmark`
--

CREATE TABLE `ac_benchmark` (
  `sha_value` varchar(255) NOT NULL,
  `ac_id` varchar(8) NOT NULL,
  `benchmark_id` varchar(20) NOT NULL,
  `source` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `primary_flag` varchar(1) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `benchmark_reference_id` varchar(20) DEFAULT NULL,
  `benchmark_reference_id_source` varchar(50) DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ac_trade`
--

CREATE TABLE `ac_trade` (
  `sha_value` varchar(255) NOT NULL,
  `ac_id` varchar(8) NOT NULL,
  `lvts` varchar(1) DEFAULT NULL,
  `calypso` varchar(1) DEFAULT NULL,
  `aladdin` varchar(1) DEFAULT NULL,
  `trade_start_date` datetime DEFAULT NULL,
  `equity` varchar(1) DEFAULT NULL,
  `fixed_income` varchar(1) DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `benchmarks`
--

CREATE TABLE `benchmarks` (
  `sha_value` varchar(255) NOT NULL,
  `benchmark_id` varchar(20) NOT NULL,
  `id_source` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `currency` varchar(3) DEFAULT NULL,
  `benchmark_reference_id` varchar(20) NOT NULL,
  `benchmark_reference_id_source` varchar(50) DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`sha_value`),
  ADD UNIQUE KEY `ac_id` (`ac_id`);

--
-- Indexes for table `ac_benchmark`
--
ALTER TABLE `ac_benchmark`
  ADD PRIMARY KEY (`sha_value`),
  ADD UNIQUE KEY `ac_id` (`ac_id`),
  ADD UNIQUE KEY `benchmark_id` (`benchmark_id`);

--
-- Indexes for table `ac_trade`
--
ALTER TABLE `ac_trade`
  ADD PRIMARY KEY (`sha_value`),
  ADD UNIQUE KEY `ac_id` (`ac_id`);

--
-- Indexes for table `benchmarks`
--
ALTER TABLE `benchmarks`
  ADD PRIMARY KEY (`sha_value`),
  ADD UNIQUE KEY `benchmark_id` (`benchmark_id`);

--
-- 限制导出的表
--

--
-- 限制表 `ac_benchmark`
--
ALTER TABLE `ac_benchmark`
  ADD CONSTRAINT `2` FOREIGN KEY (`ac_id`) REFERENCES `account` (`ac_id`);

--
-- 限制表 `ac_trade`
--
ALTER TABLE `ac_trade`
  ADD CONSTRAINT `1` FOREIGN KEY (`ac_id`) REFERENCES `account` (`ac_id`);

--
-- 限制表 `benchmarks`
--
ALTER TABLE `benchmarks`
  ADD CONSTRAINT `3` FOREIGN KEY (`benchmark_id`) REFERENCES `ac_benchmark` (`benchmark_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
