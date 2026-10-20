<?php
// require_once("insertTask.php");
// if($stmt == true){
//     $selectstmt = SELECT * FROM task
// }
require_once("connect.php");
$sql = "SELECT ID, Task FROM task";

$taskList = $conn->query($sql);
if($taskList->num_rows > 0){
    while($row = $taskList->fetch_assoc()){
        $data[] = $row;
    }
}
echo json_encode($data);

$conn->close();
?>