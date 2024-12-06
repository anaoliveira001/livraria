<?php
include 'configs.php';

$act = $_GET['act'];

//Registar Cliente

if (isset($_GET['act']) && $_GET['act'] === 'registar_cliente') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nome = $_POST['nome'];
        $data_nascimento = $_POST['data_nascimento'];
        $user = $_POST['user'];
        $password = $_POST['password'];
        $repetir_password = $_POST['repetir_password'];
        $pic = $_FILES['pic'];


        $extension = strtolower(pathinfo($pic['name'], PATHINFO_EXTENSION));
        if ($pic) {
            if (!in_array($extension, array('jpeg', 'png', 'jpg', 'gif', 'bmp', 'tiff', 'svg', 'webp'))) {
                echo "Extension is valid";
                exit;
            }
        }
        $pic_name = uniqid() . '.' . $extension;
        move_uploaded_file($pic['tmp_name'], 'uploads/' . $pic_name);


        // Verifica se as senhas correspondem
        if ($password !== $repetir_password) {
            die('As senhas não coincidem.');
        }

        // Hash da senha
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insere os dados no banco
        $sql = "INSERT INTO clientes (foto, nome, pw, user, data_nascimento) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssss', $pic_name, $nome, $pw, $user, $data_nascimento);
        $stmt->execute();

        if ($stmt->execute()) {
            // Redireciona após o registro
            header('Location: listar-clientes.php');
            exit;
        } else {
            die('Erro ao registrar cliente: ' . $conn->error);
        }
    }
}

// eliminar cliente

if ($act === 'eliminar_cliente') {
    if (isset($_GET['ID'])) {
        $id = intval($_GET['ID']); // Sanitizar o ID

        // Prepara a consulta para excluir o cliente
        $stmt = $conn->prepare("DELETE FROM clientes WHERE ID = ?");
        $stmt->bind_param('i', $id);

        // Executa a exclusão
        if ($stmt->execute()) {
            echo "<script>alert('Cliente excluído com sucesso!');</script>";
        } else {
            echo "<script>alert('Erro ao excluir cliente: {$conn->error}');</script>";
        }

        // Redireciona de volta para a lista de clientes
        header('Location: listar-clientes.php');
        exit;
    } else {
        echo "<script>alert('ID de cliente não informado.');</script>";
        header('Location: listar-clientes.php');
        exit;
    }
}

//Editar cliente

else if ($act == 'editar-cliente.php') {
    $id = $_GET['ID'];
    $nome = $_POST['nome'];
    $data_nascimento = $_POST['data_nascimento'];
    $user = $_POST['user'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("UPDATE clientes SET nome = ?, data_nascimento = ?, password = ?, user = ? WHERE id = ?");
    $stmt->bind_param('sssss', $nome, $data_nascimento, $password);

    // Redireciona 
    header('Location: listar-livros.php');
    exit;
}


// Verifica se a ação foi solicitada via método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        // Adicionar
        if ($action === 'add') {
            $titulo = $_POST['titulo'];
            $isbn = $_POST['isbn'];
            $autor = $_POST['autor'];
            $data_publicacao = $_POST['data_publicacao'];
            $qt_paginas = $_POST['qt_paginas'];
            $idioma = $_POST['idioma'];
            $sinopse = $_POST['sinopse'];

            $sql = "INSERT INTO livros (titulo, ISBN, autor, data_publicacao, qt_paginas, idioma, sinopse) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssssiss', $titulo, $isbn, $autor, $data_publicacao, $qt_paginas, $idioma, $sinopse);
            $stmt->execute();

            // Redireciona 
            header('Location: listar-livros.php');
            exit;
        }
    }
}

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recebe os dados do formulário
    $titulo = $conn->real_escape_string($_POST['titulo']);
    $isbn = $conn->real_escape_string($_POST['isbn']);
    $autor = $conn->real_escape_string($_POST['autor']);
    $data_publicacao = $conn->real_escape_string($_POST['data_publicacao']);
    $qt_paginas = $conn->real_escape_string($_POST['qt_paginas']);
    $idioma = $conn->real_escape_string($_POST['idioma']);
    $sinopse = $conn->real_escape_string($_POST['sinopse']);

    // Cria a consulta SQL
    $sql = "INSERT INTO livros (titulo, ISBN, autor, data_publicacao, qt_paginas, idioma, sinopse) 
            VALUES ('$titulo', '$isbn', '$autor', '$data_publicacao', $qt_paginas, '$idioma', '$sinopse')";

    // Executa a consulta
    if ($conn->query($sql) === TRUE) {
        echo "Livro adicionado com sucesso!";
    } else {
        echo "Erro ao adicionar o livro: " . $conn->error;
    }
}
