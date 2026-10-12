<?php
require_once("connect.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = trim($_POST['task'] ?? '');

    $stmt = $conn->prepare("INSERT INTO task (Task) VALUES (?)");
    $stmt->bind_param("s", $task);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>