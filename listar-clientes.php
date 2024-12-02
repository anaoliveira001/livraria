<?php
include 'configs.php';
?>

<!DOCTYPE html>
<html lang="pt-PT">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <a href="registar.php" class="btn">Novo</a>
    <table border=1 cellpadding=10 cellspacing=0>
        <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Conta Ativada</th>
            <th>Data de Registo</th>
            <th>Morada</th>
            <th>Opção</th>
        </tr>

        <?php
        $sql = 'SELECT ID, nome, email, conta_ativada, data_registo, morada FROM clientes';
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
                    <a href="actions.php?act=eliminar_cliente&ID=<?= $row['ID']?>">
                        <img src="imgs/delete.png" alt="Eliminar" height="20">
                        <img src="imgs/edit.png" alt="" height="20">
                    </a>
                </td>
            </tr>
        <?php
        }
        ?>
    </table>
</body>

</html>
