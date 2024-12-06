<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rigistar Novo Cliente</title>
    <link rel="stylesheet" href="assets/css/registar.css">
</head>

<body>
<form action="actions.php?act=registar_cliente" method="POST" enctype="multipart/form-data">
    <label for="name">Nome:</label>
    <input type="text"  name="nome" required>

    <label for="data_nascimento">Data Naciemnto:</label>
    <input type="date"  name="data_nascimento" required>

    <label for="user">User:</label>
    <input type="text"  name="user" required>

    <label for="password">Password:</label>
    <input type="password" i name="password" required>

    <label for="repetir_password">Repetir Password:</label>
    <input type="password"  name="repetir_password" required>

    <label for="pic">Foto de Perfil:</label>
    <input type="file"  name="pic" accept="image/*">

    <input type="submit" value="Registar">
</form>

</body>

</html>