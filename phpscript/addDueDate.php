<?php
require_once("connect.php");

$dueDateData = file_get_contents("php://input");
$dueDate = json_decode($dueDateData, true);

if(isset($dueDate['taskId'], $dueDate['dueDate'])){
    $taskId = intval($dueDate['taskId']);
    $selectedDate = $dueDate['dueDate'];

    $sql = $conn->prepare("UPDATE task SET due_date = ? WHERE ID = ?");
    $sql->bind_param("si", $selectedDate, $taskId);
    $sql->execute();
}

?>