<?php
include 'configs.php'; // Conexão com o banco

$sql = "SELECT * FROM fornecedores";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listar Fornecedores</title>
    <link rel="stylesheet" href="assets/css/listar-fornecedores.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <h1>Lista de Fornecedores</h1>
    <table>
        <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Morada</th>
            <th>Foto</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()) { ?>
            <tr>
                <td><?= $row['nome'] ?></td>
                <td><?= $row['telefone'] ?></td>
                <td><?= $row['morada'] ?></td>
                <td><img src="uploads/<?= $row['foto'] ?>" alt="Foto" width="50"></td>
            </tr>
        <?php } ?>
    </table>

    <?php include 'footer.php'; ?>
</body>

</html>
