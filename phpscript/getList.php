<?php
require_once("connect.php");

$sql = "SELECT ID, List FROM list";

$taskList = $conn->query($sql);

if($taskList->num_rows > 0){
   while($temp = $taskList->fetch_assoc()){
    $data[] = $temp;
   }
}

echo json_encode($data);

$conn->close();
?>