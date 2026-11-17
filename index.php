<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To do</title>
    <link rel="stylesheet" href="style.css"></link>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="script.js" defer></script>
</head>
<body>
    <div class="right-side-menu" id="rightSideMenu">
        <div class="permanent-list" id="permanentList">
            <div class="my-day" id="myDay">
                <p>My day</p>
            </div>
            <div class="my-day" id="myDay">
                <p>Task</p>
            </div>
        </div>
        <div class="task-list right-side-menu" id="taskList"></div>
        <button id="newList" class="newList">New List</button>
    </div>

    <div class="body-center">
       <h2>Todo</h2>
        <div id="task-container" class="box-todo">
            
        </div>
         <form id="insert-task-form">
            <input type="text" name="task" id="input-task" placeholder="task" required></input>
            <!-- <button class="insert-onsubmit" id="insertbtn">submit</button> -->
        </form>
        <div class="completed-task-container box-todo">
            <h3>Completed Task</h3>
            <div class="completed-task" id="completedTask"></div>
        </div>
        
    </div>
    <!-- side menu -->
     <div class="side-menu" id="side-menu">
        <form id="form-side-menu">
            <input type="text" id="task-side-menu" name="task-side-menu">
            <div class="steps-container" id="stepsContainer">
               
            </div>
            <input type="text" id="step-side-menu" class="step-side-menu" name="step-side-menu" placeholder="addstep">
        </form>
     </div>
    <!-- modal -->
    <!-- right click on task -->
     <div class="modal hide delete-modal">
        <div>
            <button id="delete-task-button">delete</button>
            <button id="dueDate" class="due-date">due date</button>
            <button id="moveTask" class="move-task">Move task</button>
        </div>
     </div>

     <!-- list of task modal -->
      <div class="modal hide" id="taskListOuter">
        <div class="task-list-modal" id="taskListModalInner">

        </div>
      </div>

      <!-- modal rightclick on list  -->
       <div class="modal hide" id="modalOnList">
        <div>
            <button id="deleteList">Delete</button>
            <button id="renameList">Rename</button>
        </div>
       </div>
</body>
</html>