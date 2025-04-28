-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 28 Nis 2025, 17:21:10
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `water_tracker_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'da@da.com', 'dada123'),
(2, 'abc@abc.com', 'abc'),
(3, 'deniz@q.com', 'deniz'),
(4, 'de@de.com', 'de123'),
(5, 'df@df.com', 'df123'),
(6, 'dg@dg.com', 'dg123'),
(7, 'dc@dc.com', 'dc123'),
(8, 'cd@cd.com', 'cd123');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `water_logs`
--

CREATE TABLE `water_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Tablo döküm verisi `water_logs`
--

INSERT INTO `water_logs` (`id`, `user_id`, `amount`, `created_at`) VALUES
(1, 1, 200, '2025-04-15 19:13:54'),
(2, 1, 400, '2025-04-15 19:13:59'),
(3, 1, 200, '2025-04-15 19:30:14'),
(4, 1, 200, '2025-04-15 19:30:49'),
(5, 1, 1000, '2025-04-16 17:26:49'),
(6, 1, 250, '2025-04-16 17:27:04'),
(7, 1, 244, '2025-04-16 17:58:24'),
(8, 1, 200, '2025-04-16 17:58:31'),
(9, 1, 200, '2025-04-16 18:01:31'),
(10, 1, 233, '2025-04-16 18:08:16'),
(11, 5, 200, '2025-04-17 14:42:38'),
(12, 6, 300, '2025-04-17 14:43:13'),
(13, 5, 100, '2025-04-17 14:45:41'),
(14, 5, 200, '2025-04-17 14:55:23'),
(15, 7, 100, '2025-04-17 15:24:31'),
(16, 7, 200, '2025-04-17 19:53:31'),
(17, 7, 200, '2025-04-17 19:56:59'),
(18, 7, 200, '2025-04-17 20:05:46'),
(19, 7, 200, '2025-04-17 20:12:13'),
(20, 7, 100, '2025-04-17 20:20:51'),
(21, 7, 100, '2025-04-17 20:25:14'),
(22, 7, 200, '2025-04-17 20:38:36'),
(23, 7, 200, '2025-04-19 07:12:09'),
(24, 7, 200, '2025-04-20 08:13:49'),
(25, 8, 100, '2025-04-27 14:47:38');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Tablo için indeksler `water_logs`
--
ALTER TABLE `water_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `water_logs`
--
ALTER TABLE `water_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `water_logs`
--
ALTER TABLE `water_logs`
  ADD CONSTRAINT `water_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
