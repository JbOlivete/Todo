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
    <div id="task-container" class="box-todo">
        
    </div>
    <!-- modal -->
    <!-- right click on task -->
     <div class="modal hide delete-modal">
        <div>
            <button id="delete-task">delete</button>
        </div>
     </div>
</body>
</html>