<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To do</title>
    <link rel="stylesheet" href="style.css"></link>
    <script src="script.js" defer></script>
</head>
<body>
    <div class="body-center">
        <form id="insert-task-form">
            <input type="text" name="task" id="input-task" placeholder="task" required></input>
            <!-- <button class="insert-onsubmit" id="insertbtn">submit</button> -->
        </form>
    </div>
    <div>
        <?php include 'phpscript/getTask.php' ?>
    </div>
</body>
</html>