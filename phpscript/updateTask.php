<?php
require_once("connect.php");

$updatedTask = trim($_POST['task-side-menu'] ?? '');
$Id = $_POST['Id'];
$intId = intval($Id);

$sql = "UPDATE task SET Task = ? WHERE ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $updatedTask, $intId);
$stmt->execute();

if($stmt->execute()){
    echo "Query executed successfully.";
    echo "id $intId paracontent $updatedTask";
}
?>