<?php
require_once("connect.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if(isset($data["taskId"], $data["listId"])){
    $taskId = intval($data["taskId"]);
    $listId = intval($data["listId"]);
    $stmt = $conn->prepare("UPDATE task SET group_list = ? WHERE ID = ?");
    $stmt->bind_param("ii", $listId, $taskId);
    $stmt->execute();
}
?>