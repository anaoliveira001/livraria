<?php
include 'configs.php';
 
$act = $_GET['act'];
 
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