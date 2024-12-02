<?php
include 'configs.php';
 
$act = $_GET['act'];
 
//Registar Cliente

if($act =='registar_cliente'){
    $nome = $_POST['name'];
    $data_nascimento = $_POST['data_nascimento'];
    $user = $_POST['user'];
    $password = $_POST['password'];
    $email = $_POST['email'];
}


// Eliminar cliente
if ($act == 'eliminar_cliente'){
    $ID = $_GET['ID'];
 
    $stmt = $conn->prepare('DELETE FROM clientes WHERE ID = ?');
    $stmt->bind_param('i', $ID);
    $stmt->execute();
 
    if ($stmt->affected_rows === 0)
        echo "Não foi possível apagar este cliente";
    else
        echo "Apagado com sucesso!!!";
 
    exit;
}

