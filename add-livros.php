<?php
include 'configs.php';

// Verificar se o formulário foi enviado.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'];
    $isbn = $_POST['isbn'];
    $autor = $_POST['autor'];
    $data_publicacao = $_POST['data_publicacao'];
    $qt_paginas = $_POST['qt_paginas'];
    $idioma = $_POST['idioma'];
    $sinopse = $_POST['sinopse'];

    // novo livro -db
    $sql = "INSERT INTO livros (titulo, ISBN, autor, data_publicacao, qt_paginas, idioma, sinopse) 
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssiss', $titulo, $isbn, $autor, $data_publicacao, $qt_paginas, $idioma, $sinopse);
    $stmt->execute();

    
    header('Location: listar-livros.php');
    exit;
}
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
    <h1>Adicionar Livro</h1>
    <form method="post">
        <label for="titulo">Título:</label><br>
        <input type="text" id="titulo" name="titulo" required><br><br>

        <label for="isbn">ISBN:</label><br>
        <input type="text" id="isbn" name="isbn" required><br><br>

        <label for="autor">Autor:</label><br>
        <input type="text" id="autor" name="autor" required><br><br>

        <label for="data_publicacao">Data de Publicação:</label><br>
        <input type="date" id="data_publicacao" name="data_publicacao" required><br><br>

        <label for="qt_paginas">Quantidade de Páginas:</label><br>
        <input type="number" id="qt_paginas" name="qt_paginas" required><br><br>

        <label for="idioma">Idioma:</label><br>
        <input type="text" id="idioma" name="idioma" required><br><br>

        <label for="sinopse">Sinopse:</label><br>
        <textarea id="sinopse" name="sinopse" rows="4" cols="50"></textarea><br><br>

        <button type="submit">Salvar</button>
    </form>
    <br>
    <div class="button-container">
        <a href="listar-livros.php">Voltar para Lista de Livros</a>
    </div>
</body>

</html>
