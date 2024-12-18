<?php
include 'configs.php';
display_message();
?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Clientes</title>
    <link rel="stylesheet" href="assets/css/listar-clientes.css">
</head>

<body>
    <?php include 'header.php'; ?>
    <a href="registar-php" class="btn">Novo</a>
    <table>
        <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Conta Ativada</th>
            <th>Data de Registo</th>
            <th>Morada</th>
            <th>Foto</th>
            <th>Opção</th>
        </tr>

        <?php
        $sql = 'SELECT ID, nome, email, conta_ativada, data_registo, morada, foto FROM clientes';
        $result = $conn->query($sql);


        while ($row = $result->fetch_assoc()) {

            // Processar o campo conta_ativada
            $contaAtivada = $row['conta_ativada'] == 1 ? "S" : "N";
        ?>
            <tr>
                <td><?= $row['nome'] ?></td>
                <td><?= $row['email'] ?></td>
                <td><?= $contaAtivada ?></td>
                <td><?= $row['data_registo'] ?></td>
                <td><?= $row['morada'] ?></td>
                <td>
                    <img src="uploads/<?= $row['foto'] ?>" alt="Foto do Usuário" width="20">
                </td>

                <td>
                    <!--  excluir -->
                    <a href="actions.php?act=eliminar_cliente&ID=<?= $row['ID'] ?>" onclick="return confirm('Tem certeza que deseja excluir este cliente?');">
                        <img src="imgs/delete.png" alt="Eliminar" height="20">
                    </a>

                    <!-- editar -->
                    <a href="editar-cliente.php?ID=<?= $row['ID'] ?>">
                        <img src="imgs/edit.png" alt="Editar" height="20">
                    </a>
                </td>
            </tr>
        <?php
        }
        ?>
    </table>
    <?php include 'footer.php'; ?>
</body>

</html>