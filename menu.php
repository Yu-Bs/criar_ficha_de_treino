<?php
session_start();
include_once './database.php';
include_once './usuario.php';

// Se veio do login
if (isset($_POST['usuario'])) {
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];

    $consulta = mysqli_query($conexao, "SELECT idUsuario, nome, login, senha FROM usuario WHERE login ='$usuario'");
    $dados = mysqli_fetch_assoc($consulta);
    $user = null;

    if ($dados != null) {
        $user = new Usuario($dados["idUsuario"], $dados["nome"], $dados["login"], $dados["senha"]);
    }

    if ($user != null && $user->validaUsuarioSenha($usuario, $senha)) {
        $_SESSION['user'] = $user;
        $_SESSION['idUsuario'] = $dados['idUsuario'];
    } else {
        $_SESSION['msg'] = "Usuário ou senha incorretos!!!";
        header("Location: index.php");
        exit;
    }
}

// Se não está logado
if (!isset($_SESSION['user'])) {
    $_SESSION['msg'] = "É necessário logar antes de acessar a página!";
    header("Location: index.php");
    exit;
}

$classe = isset($_GET["classe"]) ? $_GET["classe"] : "";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Página Inicial</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.3.1/jquery.twbsPagination.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.5/validator.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="logout.css"/>
    <?php if (!empty($classe)) { ?>
        <script src="javascript<?php echo $classe; ?>.js"></script>
    <?php } ?>
</head>
<body>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
               Ficha de Treino
            </div>
            <ul class="nav navbar-nav">
                <li class="active"><a href="menu.php">Home</a></li>
                <li><a href="menu.php?classe=Ficha">Ficha</a></li>
            </ul>
        </div>
    </nav>

    <?php if (!empty($classe)) { ?>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 margin-tb">                    
                <div class="pull-left">
                    <h2>Cadastro de <?php echo $classe; ?></h2>
                </div>
                <div class="pull-right">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#create-item">
                        Criar <?php echo $classe; ?>
                    </button>
                </div>
            </div>
        </div>
        
        <table class="table table-bordered">
            <thead></thead>
            <tbody></tbody>
        </table>

        <ul id="pagination" class="pagination-sm"></ul>

        <!-- Modal de criação -->
        <div class="modal fade" id="create-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>×</span></button>
                        <h4 class="modal-title">Criar <?php echo $classe; ?></h4>
                    </div>
                    <div class="modal-body">
                        <form data-toggle="validator" action="insert<?php echo $classe; ?>.php" method="POST"></form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de edição -->
        <div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>×</span></button>
                        <h4 class="modal-title">Editar <?php echo $classe; ?></h4>
                    </div>
                    <div class="modal-body">
                        <form data-toggle="validator" action="update<?php echo $classe; ?>.php" method="POST"></form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>
    <div>
        <a href="logout.php">Sair</a>
    </div>
</body>
</html>
