<?php
include 'configs.php';
$ID = $GET['ID'];

$stm = $conn->prepare('SELECT *FROM cliente WHERE ID = ?');
$stm->bind_param('i', $ID);
$stm->execute();

$results = $stm->get_result();

$cliente = $results->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Editar Cliente</title>
</head>

<body>
    <form action="actions.php?act=editar-cliente" method="POST">
        <input type="hidden" name="ID" value="<? $ID ?>">

        <label for="name">Nome:</label>
        <input type="text" id="nome" name="nome" value="<? $cliente['nome'] ?>" required>

        <label for="data_nascimento">Data Nascimento:</label>
        <input type="date" id="data_nascimento" name="data_nascimento" required>

        <label for="user">User:</label>
        <input type="text" id="user" name="user" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <label for="repetir_password">Repetir Password:</label>
        <input type="password" id="repetir_password" name="repetir_password" required>

        <label for="pic">Foto de Perfil:</label>
        <input type="file" id="pic" name="pic" accept="image/*">

        <input type="submit" value="Registar">
    </form>
</body>

</html>