<?php

$host = 'localhost'; 
$user = 'root'; 
$password = ''; 
$database = 'livraria'; 

// Criando a conexão com o banco de dados
$conn = new mysqli($host, $user, $password, $database);

// Verificando se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}
?>
