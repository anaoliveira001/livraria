<?php
include 'configs.php';

if (!isset($_GET['ID'])) {
    die("ID do livro não fornecido.");
}

$id = intval($_GET['ID']); // Previne SQL Injection

// Busca os dados do livro
$stmt = $conn->prepare("SELECT * FROM livros WHERE ID = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();


?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Livro</title>
    <link rel="stylesheet" href="assets/css/editar-livros.css">
</head>

<body>
<div class="container">
        <h1>Editar Livro</h1>
        <form action="actions.php?act=editar_livro" method="POST">
            <table>
                <tr>
                    <th>Título:</th>
                    <td><input type="text" id="titulo" name="titulo" value="" placeholder="Titulo"></td>
                </tr>
                <tr>
                    <th>ISBN:</th>
                    <td><input type="text" id="isbn" name="isbn" value="" placeholder="ISBN"></td>
                </tr>
                <tr>
                    <th>Autor:</th>
                    <td><input type="text" id="autor" name="autor" value="" placeholder="Autor"></td>
                </tr>
                <tr>
                    <th>Data de Publicação:</th>
                    <td><input type="date" id="data_publicacao" name="data_publicacao" value="" placeholder="Data de Publicação"></td>
                </tr>
                <tr>
                    <th>Quantidade de Páginas:</th>
                    <td><input type="number" id="qt_paginas" name="qt_paginas" value="" placeholder="Quantidade Páginas"></td>
                </tr>
                <tr>
                    <th>Idioma:</th>
                    <td>
                        <select id="idioma" name="idioma">
                            <option value="Português">Português</option>
                            <option value="Inglês">Inglês</option>
                            <option value="Espanhol">Espanhol</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Sinopse:</th>
                    <td><textarea id="sinopse" name="sinopse"></textarea></td>
                </tr>
            </table>
            <button type="submit">Salvar</button>
        </form>
    </div>
</body>

</html>