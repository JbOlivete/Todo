<?php
require_once("connect.php");

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if(isset($data["task"], $data["date"])){
    $taskValue = $data["task"];
    $date = $data["date"];

    $sql = $conn->prepare("INSERT INTO task (Task, date_created) VALUES (?,?)");
    $sql->bind_param("ss", $taskValue, $date);
    $sql->execute();
}

$conn->close();
?>