<?php
require_once("connect.php");

$jsStepData = file_get_contents("php://input");
$stepData = json_decode($jsStepData, true);

if(isset($stepData['taskId'], $stepData['stepValue'])){
    $taskId = intval($stepData['taskId']);
    $taskStep = $stepData['stepValue'];
    
    $sql = $conn->prepare("INSERT INTO task_step (TaskID, Steps) VALUES (?,?)");
    $sql->bind_param("is", $taskId, $taskStep);
    $sql->execute();
}

?>