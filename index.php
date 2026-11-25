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
    <!-- left side menu -->
    <div class="left-side-menu" id="rightSideMenu">
        <div class="permanent-list" id="permanentList">
            <div class="my-day-task" id="myDayTask">
                <p>My day</p>
            </div>
            <div class="all-task" id="allTask">
                <p>Task</p>
            </div>
            <div class="task-list right-side-menu show-container" id="taskList">
                
            </div>
            <div class="show-container"><input type="text" class="list-field hide" id="newListField" value="Untitle List"></div>
        </div>
        
        <div><button id="newList" class="newList show-container">New List</button></div>
    </div>

    <div class="body-center">
        <div class="task-section">
            <h2>My Day</h2>
            <div id="task-container" class="box-todo"></div>
            <div class="show-container completedSection">
                <button class="completed-button hide" id="completedBtn">Completed</button>
                <div class="completed-task-container hide" id="completedTaskParent">
                    <div class="completed-task show-container" id="completedTask"></div>
                </div>

            </div>
        </div>

        <div class="input-task-section show-container">
            <input type="text" name="task" id="input-task" class="input-task-field" placeholder="What's your need wants today?" required></input>
        </div>
        <!-- <button class="insert-onsubmit" id="insertbtn">submit</button> -->
        
    </div>
    <!-- right side menu -->
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

       <!-- delete steps modal -->
        <div class="modal hide" id="modalOnSteps">
            <div>
                <button id="deleteSteps" class="deleteSteps">Delete</button>
            </div>
        </div>
</body>
</html>