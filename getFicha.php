<?php
session_start();
include 'database.php';

$idUsuario = $_SESSION['idUsuario'];

$init = isset($_GET['page'])?($_GET['page']-1)*10:0;

$total = mysqli_fetch_array($conexao->query("select count(*) from ficha"));

$sql = "select * from ficha where idUsuario = $idUsuario limit ".$init.", 10";
$result = $conexao->query($sql);

$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);

$conexao->close();

header('Content-type: application/json');
echo json_encode(['data' => $rows, "total" => $total[0]]);
?>
