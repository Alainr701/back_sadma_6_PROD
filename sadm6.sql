-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-08-2024 a las 00:22:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sadm6`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `tipousuarios` varchar(255) NOT NULL,
  `ci` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fec_cre` datetime DEFAULT NULL,
  `fec_mod` datetime DEFAULT NULL,
  `usu_cre` varchar(255) DEFAULT NULL,
  `usu_mod` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombres`, `apellidos`, `tipousuarios`, `ci`, `edad`, `user`, `password`, `fec_cre`, `fec_mod`, `usu_cre`, `usu_mod`) VALUES
(1, 'Juan', 'Cortes', 'Administrador', '123456712', 35, 'admin', 'admin', NULL, '2024-08-28 16:06:02', NULL, NULL),
(2, 'Juan', 'Cortes', 'Administrador', '1234567', 35, 'admin2', 'admin2', '2024-08-28 16:04:39', '2024-08-28 16:05:45', NULL, NULL),
(5, 'Juan', 'Cortes', 'Administrador', '1234567122', 35, 'admin3', 'admin', '2024-08-28 16:07:15', '2024-08-28 16:09:48', NULL, NULL),
(8, 'Juan', 'Cortes', 'Administrador', '12345671223', 35, 'admins', 'admin', '2024-08-28 16:10:20', NULL, NULL, NULL);

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `before_insert_usuarios` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
    SET NEW.fec_cre = NOW();
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_usuarios` BEFORE UPDATE ON `usuarios` FOR EACH ROW BEGIN
    SET NEW.fec_mod = NOW();
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ci_unique` (`ci`),
  ADD UNIQUE KEY `user` (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
