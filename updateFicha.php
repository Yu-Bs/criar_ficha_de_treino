<?php
include 'database.php';

header('Content-type: application/json');

$sql = "UPDATE ficha SET 
    nomeExercicio = '" . $_POST['nomeExercicio'] . "', 
    grupoMuscular = '" . $_POST['grupoMuscular'] . "', 
    repeticoes = " . $_POST['repeticoes'] . ", 
    series = " . $_POST['series'] . ", 
    carga = " . $_POST['carga'] . " 
    WHERE idFicha = " . $_POST['idFicha'];

if ($conexao->query($sql) === TRUE) {
    $msg = "Ficha atualizada com sucesso!";
} else {
    $msg = "Error: " . $sql . "<br>" . $conexao->error;
}

$conexao->close();

echo json_encode(['msg' => $msg]);
?>
