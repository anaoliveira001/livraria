<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rigistar Novo Cliente</title>
    <link rel="stylesheet" href="assets/css/registar.css">
</head>

<body>
    <form action="actions.php?act=registar_cliente" method="POST">
        <label for="name">Nome:</label>
        <input type="text" id="nome" name="nome">

        <label for="data_nascimento">Data Nascimento:</label>
        <input type="date" id="data_nascimento" name="data_nascimento">

        <label for="user">User:</label>
        <input type="text" id="user" name="user">

        <label for="password">Password:</label>
        <input type="password" id="password" name="password">

        <label for="repetir_password">Repetir Password:</label>
        <input type="password" id="repetir_password" name="repetir_password">

        <label for="pic">Pic:</label>
        <input type="file" id="pic" name="pic">

        <input type="submit" value="Registar">
    </form>
</body>

</html>