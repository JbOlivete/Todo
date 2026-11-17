<?php
require_once("connect.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if(isset($data["Id"])){
    $listId = intval($data["Id"]);
    $sql = $conn->prepare("DELETE FROM list WHERE ID = ?");
    $sql->bind_param("i", $listId);
    $sql->execute();
}
    
?>