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


if (!function_exists('set_message')) {
    function set_message($type, $message)
    {
        $_SESSION['message'] = [
            'type' => $type,
            'message' => $message
        ];
    }
}

if (!function_exists('display_message')) {
    function display_message()
    {
        if (isset($_SESSION['message'])) {
            $type = $_SESSION['message']['type'];
            $message = $_SESSION['message']['message'];

            echo "<div class='alert alert-$type'>$message</div>";
            unset($_SESSION['message']);
        }
    }
}
