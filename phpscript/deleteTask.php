<?php
    require_once("connect.php");

    $rawData = file_get_contents("php://input");
    var_dump($rawData);
    $data = json_decode($rawData, true);
    var_dump($data);

    if (isset($data['task_id'])) {
        $id = intval($data['task_id']);

        $stmt = $conn->prepare("DELETE FROM task WHERE ID = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
    }

    $conn->close();
?>