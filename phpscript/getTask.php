<?php
// require_once("insertTask.php");
// if($stmt == true){
//     $selectstmt = SELECT * FROM task
// }
require_once("connect.php");
$sql = "SELECT Task FROM task";

$taskList = $conn->query($sql);

if($taskList->num_rows > 0){
    while($row = $taskList->fetch_assoc()){
        echo "task:" . $row["Task"];
    }
}else{
    echo "no task found";
}

$conn->close()
?>