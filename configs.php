<?php
$server = 'localhost';
$user = 'root';
$pw = '';
$db = 'livraria';

error_reporting(E_ALL); // mostra todos os erros
ini_set('display_errors', 1); // reforço da apresentaçao de erros
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // reporta erros

//ligação db
$conn = new mysqli($server, $user, $pw, $db);
//condiçao de erro
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    exit;
}


