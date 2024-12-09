<?php
include 'configs.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livraria</title>
    <style>
        header {
            background-color: #0077cc;
            padding: 10px 0;
            text-align: center;
        }

        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin: 0 10px;
        }

        nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        .btn {
            padding: 10px 15px;
            font-size: 16px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <ul>
                <li><a href="listar-clientes.php">Clientes</a></li>
                <li><a href="listar-fornecedores.php">Fornecedores</a></li>
                <li><a href="listar-livros.php">Livros</a></li>
            </ul>
        </nav>
    </header>