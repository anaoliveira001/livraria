<?php
include 'configs.php';


if (isset($_GET['delete_id'])) {
    $delete_id = $_GET['delete_id'];

    // Deletar o livro com base no ID fornecido.
    $sql = "DELETE FROM livros WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $delete_id);
    $stmt->execute();

    $sql = "SELECT livros.*, fornecedores.nome AS fornecedor 
    FROM livros 
    INNER JOIN fornecedores ON livros.ID_fornecedor = fornecedores.ID";
}
?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listar Livros</title>
    <link rel="stylesheet" href="assets/css/listar-livros.css">
</head>

<body>
    <?php include 'header.php'; ?>
    <h1>Lista de Livros</h1>
    <table border=1 cellpadding=10 cellspacing=0>
        <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Data de Publicação</th>
            <th>Opções</th>
        </tr>

        <?php
        // Consultar todos os livros.
        $sql = 'SELECT ID, titulo, autor, data_publicacao FROM livros';
        $result = $conn->query($sql);

        // Exibir os dados na tabela.
        while ($row = $result->fetch_assoc()) {
        ?>
            <tr>
                <td><?= $row['titulo'] ?></td>
                <td><?= $row['autor'] ?></td>
                <td><?= $row['data_publicacao'] ?></td>
                <td>
                    <!-- Link para deletar o livro -->
                    <a href="listar-livros.php?delete_id=<?= $row['ID'] ?>" onclick="return confirm('Tem certeza que deseja excluir este livro?');">
                        <img src="imgs/delete.png" alt="" width="20">
                    </a>
                    <a href="editar-livro.php?ID=<?= $row['ID'] ?>">
                        <img src="imgs/edit.png" alt="Editar" height="20">
                    </a
                        </td>
            </tr>
        <?php
        }
        ?>
    </table>
    <br>
    <a href="add-livros.php">Adicionar Novo Livro</a>
    <?php include 'footer.php'; ?>;
</body>

</html>