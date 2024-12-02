-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Dez-2024 às 16:15
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `livraria_bk2dez`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `ID` int(11) NOT NULL,
  `foto` varchar(20) DEFAULT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pw` varchar(64) DEFAULT NULL,
  `conta_ativada` tinyint(1) DEFAULT NULL,
  `tipo` enum('admin','utilizador','moderador') DEFAULT NULL,
  `data_registo` timestamp NOT NULL DEFAULT current_timestamp(),
  `morada` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`ID`, `foto`, `nome`, `email`, `pw`, `conta_ativada`, `tipo`, `data_registo`, `morada`) VALUES
(1, 'foto1.png', 'Joana', 'joana.xpto.com', '12345', 1, 'utilizador', '2024-12-02 14:28:05', 'Rua XPTO, 2365'),
(2, 'foto2.png', 'Joao', 'joao.xpto.com', '1234506', 0, 'admin', '2024-12-02 14:28:05', 'Rua Amado Faria, 45263'),
(3, 'foto3.png', 'Catarina', 'catarina.xpto.com', 'catarina', 1, 'moderador', '2024-12-02 14:31:19', 'Rua Jose Faria, 4582'),
(4, 'foto04-png', 'Maria Fernanda', 'maria.fernanda@xpto.com', 'mariafe', 1, 'utilizador', '2024-12-02 14:31:19', 'Rua Santa Catarina, 458');

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedores`
--

CREATE TABLE `fornecedores` (
  `ID` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `morada` varchar(150) DEFAULT NULL,
  `foto` varchar(10) DEFAULT NULL,
  `tipo` enum('admin','utilizador') DEFAULT NULL,
  `ID_livro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `livros`
--

CREATE TABLE `livros` (
  `ID` int(11) NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `ISBN` varchar(15) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `data_publicacao` date DEFAULT NULL,
  `qt_paginas` smallint(6) DEFAULT NULL,
  `idioma` varchar(20) DEFAULT NULL,
  `sinopse` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_livro` (`ID_livro`);

--
-- Índices para tabela `livros`
--
ALTER TABLE `livros`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `livros`
--
ALTER TABLE `livros`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `fornecedores`
--
ALTER TABLE `fornecedores`
  ADD CONSTRAINT `fornecedores_ibfk_1` FOREIGN KEY (`ID_livro`) REFERENCES `livros` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
