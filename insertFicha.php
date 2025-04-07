<?php
session_start();
include 'database.php';

header('Content-type: application/json');

$idUsuario = $_SESSION['idUsuario'];

$sql = "INSERT INTO ficha (nomeExercicio, grupoMuscular, repeticoes, series, carga, idUsuario) VALUES ('" 
        . $_POST['nomeExercicio'] . "', '" 
        . $_POST['grupoMuscular'] . "', " 
        . $_POST['repeticoes'] . ", " 
        . $_POST['series'] . ", " 
        . $_POST['carga'] . ","
        .$idUsuario.")";

if ($conexao->query($sql) === TRUE) {
    $msg = "Ficha criada com sucesso!";
} else {
    $msg = "Erro: " . $sql . "<br>" . $conexao->error;
}

$conexao->close();

echo json_encode(['msg' => $msg]);
?>
