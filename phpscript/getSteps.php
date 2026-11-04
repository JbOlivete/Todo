<?php
require_once("connect.php");

// select data base id
$rawData = file_get_contents("php://input");
$taskId = json_decode($rawData, true);

if(isset($taskId['task_id'])){
    $id = intval($taskId['task_id']);
}
$sql = "SELECT ID, Steps FROM task_step WHERE TaskID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

// $sql->execute()
$taskStep = $stmt->get_result();
if($taskStep->num_rows > 0){
    while($row = $taskStep->fetch_assoc()){
        $data[] = $row;
    }
}
if(isset($data)){
    echo json_encode($data);
}
?>