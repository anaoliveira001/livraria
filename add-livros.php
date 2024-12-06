<?php
include 'configs.php';
?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adicionar Livro</title>
    <link rel="stylesheet" href="assets/css/add-livros.css">

</head>

<body>
    <div class="container">
    <h1>Adicionar Livro</h1>
    <form action="actions.php?act=adicionar_livro" method="POST">
        <table>
            <tr>
                <th>Título:</th>
                <td><input type="text" id="titulo" name="titulo" required placeholder="Titulo"></td>
            </tr>
            <tr>
                <th>ISBN:</th>
                <td><input type="text" id="isbn" name="isbn" required placeholder="ISBN"></td>
            </tr>
            <tr>
                <th>Autor:</th>
                <td><input type="text" id="autor" name="autor" required placeholder="Autor"></td>
            </tr>
            <tr>
                <th>Data de Publicação:</th>
                <td><input type="date" id="data_publicacao" name="data_publicacao" required placeholder="Data Publicação"></td>
            </tr>
            <tr>
                <th>Quantidade de Páginas:</th>
                <td><input type="number" id="qt_paginas" name="qt_paginas" required placeholder="Quantidade de Páginas"></td>
            </tr>
            <tr>
                <th>Idioma:</th>
                <td>
                    <select id="idioma" name="idioma" required>
                        <option value="Português">Português</option>
                        <option value="Inglês">Inglês</option>
                        <option value="Espanhol">Espanhol</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Sinopse:</th>
                <td><textarea id="sinopse" name="sinopse" required placeholder="Sinopse"></textarea></td>
            </tr>
        </table>
        <button type="submit" >Adicionar</button>
    </form>
    </div>

</body>

</html>