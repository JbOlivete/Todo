<?php
    require_once("connect.php");

    $rawData = file_get_contents("php://input");
    var_dump($rawData);
    $data = json_decode($rawData, true);
    var_dump($data);

    if (isset($data['task_id'])) {
        $id = intval($data['task_id']);
        $status = intval($data['status']);
        $sql = "UPDATE task SET Completed = ? WHERE ID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $status, $id);
        $stmt->execute();
    }

    $conn->close();
?>