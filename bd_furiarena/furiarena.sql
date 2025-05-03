-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para furiarena
CREATE DATABASE IF NOT EXISTS `furiarena` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `furiarena`;

-- Copiando estrutura para tabela furiarena.campeonato
CREATE TABLE IF NOT EXISTS `campeonato` (
  `id_campeonato` int(11) NOT NULL AUTO_INCREMENT,
  `nome_campeonato` varchar(100) NOT NULL,
  `jogo_campeonato` varchar(100) NOT NULL DEFAULT '0',
  `sigla_jogo_campeonato` varchar(100) NOT NULL,
  `status_campeonato` varchar(100) NOT NULL,
  `img_jogo_campeonato` varchar(100) NOT NULL,
  PRIMARY KEY (`id_campeonato`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela furiarena.campeonato: ~4 rows (aproximadamente)
INSERT INTO `campeonato` (`id_campeonato`, `nome_campeonato`, `jogo_campeonato`, `sigla_jogo_campeonato`, `status_campeonato`, `img_jogo_campeonato`) VALUES
	(1, 'RLCS 2025 - Raleigh Major: South America Open 4', 'Rocket League', 'Rl', 'Fase de Grupos', 'assets/img/rl-logo.svg'),
	(2, 'LTA Sul Split 2 2025 - Grupo B', 'League of Legends', 'LOL', 'Fase de Grupos', 'assets/img/lol-logo.svg'),
	(3, 'PGL Astana 2025', 'Counter Stike 2', 'CS2', 'Aguardando Inicio', 'assets/img/cs2-logo.svg'),
	(5, 'VCT 2025: Americas Stage 2', 'Valorant', 'VAL', 'Aguardando Inicio', 'assets/img/valorant-logo.svg');

-- Copiando estrutura para tabela furiarena.partidas
CREATE TABLE IF NOT EXISTS `partidas` (
  `id_partida` int(11) NOT NULL AUTO_INCREMENT,
  `qtd_partida` int(11) NOT NULL DEFAULT 0,
  `id_time` int(11) NOT NULL DEFAULT 0,
  `id_campeonato` int(11) NOT NULL,
  `hora_campeonato` varchar(5) NOT NULL,
  `data_campeonato` date NOT NULL,
  `placar_adversario_campeonato` int(11) NOT NULL,
  `placar_furia_campeonato` int(11) NOT NULL,
  `status_partida` varchar(50) NOT NULL,
  `link_partida` varchar(250) NOT NULL,
  PRIMARY KEY (`id_partida`),
  KEY `FK__times` (`id_time`),
  KEY `FK_partidas_campeonato` (`id_campeonato`),
  CONSTRAINT `FK__times` FOREIGN KEY (`id_time`) REFERENCES `times` (`id_time`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_partidas_campeonato` FOREIGN KEY (`id_campeonato`) REFERENCES `campeonato` (`id_campeonato`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela furiarena.partidas: ~8 rows (aproximadamente)
INSERT INTO `partidas` (`id_partida`, `qtd_partida`, `id_time`, `id_campeonato`, `hora_campeonato`, `data_campeonato`, `placar_adversario_campeonato`, `placar_furia_campeonato`, `status_partida`, `link_partida`) VALUES
	(1, 3, 2, 2, '15:00', '2025-05-03', 0, 0, 'Aguardando inicio', 'https://www.twitch.tv/ltasul'),
	(2, 5, 1, 1, '19:10', '2025-05-03', 0, 3, 'Vitória', 'https://www.twitch.tv/rocketleague'),
	(3, 3, 3, 2, '12:00', '2025-05-03', 0, 0, 'Aguardando inicio', 'https://www.twitch.tv/ltasul'),
	(4, 5, 5, 1, '20:30', '2025-04-27', 1, 3, 'Vitória', 'https://www.twitch.tv/rocketleague'),
	(5, 5, 4, 1, '19:55', '2025-04-27', 2, 3, 'Vitória', 'https://www.twitch.tv/rocketleague'),
	(7, 5, 6, 1, '19:00', '2025-04-27', 1, 3, 'Vitória', 'https://www.twitch.tv/rocketleague'),
	(8, 5, 7, 1, '19:45', '2025-04-27', 0, 3, 'Vitória', 'https://www.twitch.tv/rocketleague'),
	(9, 3, 8, 2, '15:00', '2025-04-27', 1, 2, 'Vitória', 'https://www.twitch.tv/ltasul');

-- Copiando estrutura para tabela furiarena.times
CREATE TABLE IF NOT EXISTS `times` (
  `id_time` int(11) NOT NULL AUTO_INCREMENT,
  `nome_time` varchar(50) NOT NULL,
  PRIMARY KEY (`id_time`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela furiarena.times: ~8 rows (aproximadamente)
INSERT INTO `times` (`id_time`, `nome_time`) VALUES
	(1, 'GRATIA'),
	(2, 'RED CANIDS'),
	(3, 'FLUXO W7M'),
	(4, 'AMETHYST'),
	(5, 'TEAM REDS'),
	(6, 'PAPO DE VISÃO'),
	(7, 'RED'),
	(8, 'LOUD');

-- Copiando estrutura para tabela furiarena.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(100) NOT NULL,
  `senha_usuario` varchar(250) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `tipo_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela furiarena.usuarios: ~3 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `nome_usuario`, `senha_usuario`, `email_usuario`, `tipo_usuario`) VALUES
	(3, 'Renan Zanetti', '$2b$10$0EEUPKv.mMLbgHpwERnwMu5eYvqDAcaC36XWdz5W23XpJP3ukNglO', 'renanzanettio@gmail.com', 'admin'),
	(4, 'Matheus', '$2b$10$ktsrxbu9JuHpTogfDL8eS.rDsW7Y.lHHbaI8pbshzvZQ0ZNg2VLQ6', 'mat@gmail.com', 'padrao'),
	(5, 'moledo', '$2b$10$FjPxYB8S2GEhyIFSqsUpX..VmYLtukoWY5w9Se2hodufQghXu4XU.', 'moledo@gmail.com', 'padrao');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
