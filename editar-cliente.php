<?php
include 'configs.php';
$ID = $_GET['ID'];

$stm = $conn->prepare('SELECT * FROM clientes WHERE ID = ?');
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
    <link rel="stylesheet" href="assets/css/editar-cliente.css">
</head>

<body>
    
    <form action="actions.php?act=editar-cliente" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="ID" value="<? $ID ?>">

        <label for="name">Nome:</label>
        <input type="text" name="nome" value="<?= $cliente['nome'] ?>" required>

        <label for="data_nascimento">Data Nascimento:</label>
        <input type="date" name="data_nascimento" value="<?= $cliente['data_nascimento'] ?>" required>

        <label for="user">User:</label>
        <input type="text" name="user" value="<?= $cliente['user'] ?>" required>

        <label for="password">Password:</label>
        <input type="password" value="<?= $cliente['pw'] ?>" name="password" required>

        <label for="repetir_password">Repetir Password:</label>
        <input type="password" id="repetir_password" name="repetir_password" required>

        <label for="pic">Foto de Perfil:</label>
        <input type="file" accept="image/*">

        <button>Registar</button>

        
    </form>
</body>

</html>