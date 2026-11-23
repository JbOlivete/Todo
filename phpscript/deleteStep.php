<?php
require_once("connect.php");
$rawData = file_get_contents("php://input");
$stepID = json_decode($rawData, true);

if(isset($stepID["stepsID"])){
    $ID = intval($stepID["stepsID"]);
    $sql = $conn->prepare("DELETE FROM task_step WHERE ID = ?");
    $sql->bind_param("i", $ID);
    $sql->execute();
}
?>