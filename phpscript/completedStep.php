<?php
require_once("connect.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if(isset($data["list_id"], $data["status"])){
    $list_id = intval($data["list_id"]);
    $status = intval($data["status"]);

    $sql = $conn->prepare("UPDATE task_step SET Status = ? WHERE ID = ?");
    $sql->bind_param("ii", $status, $list_id);
    $sql->execute();
}
?>