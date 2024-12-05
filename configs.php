<?php
// Configuração do banco de dados
$host = 'localhost'; // Endereço do servidor (geralmente localhost)
$user = 'root'; // Nome de usuário do MySQL
$password = ''; // Senha do MySQL (em muitos casos no XAMPP, é vazio)
$database = 'livraria'; // Nome do banco de dados

// Criando a conexão com o banco de dados
$conn = new mysqli($host, $user, $password, $database);

// Verificando se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}
?>
