<?php
require_once("connect.php");

$data = file_get_contents("php://input");
$taskList = json_decode($data, true);

if(isset($taskList['list'])){
    $newList = $taskList['list'];

    $sql = $conn->prepare("INSERT INTO list (List) VALUES (?)");
    $sql->bind_param("s", $newList);
    $sql->execute();
}
?>