const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form");
const getTaskContainer = document.getElementById("task-container");
const deleteModal = document.querySelector(".delete-modal");
const deleteBtn = document.getElementById("delete-task-button");
const rightSideMenu = document.getElementById("side-menu");
const fieldSideMenu = document.getElementById("task-side-menu");
const taskCheckBox = document.getElementById("task-checkbox");
const completedTaskContainer = document.getElementById("completedTask");
const addTaskStep = document.getElementById("step-side-menu");
const stepsContainer = document.getElementById("steps-container");
const dueDate = document.getElementById("dueDate");
const newListBtn = document.getElementById("newList");
const taskListContainer = document.getElementById("taskList");
const taskListModal = document.getElementById("taskListOuter")
const moveTaskBtn = document.getElementById("moveTask");
const taskListContent = document.getElementById("taskListContent");
const listModal = document.getElementById("taskListModalInner");

getTask();
getList();
//add
addTask.addEventListener('keydown', function(event) {
    if(addTask.value.trim() === ""){
       //to required
    }else{
        if(event.key === 'Enter'){
            event.preventDefault();
            
            const inputValue = new FormData(insertTaskForm);
            
            fetch('phpscript/insertTask.php', {
                method: 'POST',
                body: inputValue
            });
            addTask.value = '';
            
            setTimeout(() => {
            getTask();
            }, 250);
            
        }
    }
});
// get task
function getTask(){
    // get data without refreshing the page
    fetch('phpscript/getTask.php')
        .then(response => {
            if(!response.ok){
                throw new Error('network not response')
            }
            return response.json();
        })
        .then(data => {
            let taskHolder = "";
            let completedTaskHolder = "";
            data.forEach(task => {
                const status = parseInt(task.Completed);
                if(status == 0){
                    taskHolder += `<div class="todo-container" id="todo-container"> 
                        <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" data-list-group="${task.group_list}"><p id="${task.ID}" class="task-item"> ${task.Task}</p>
                    </div>`;
                    
                    getTaskContainer.innerHTML = taskHolder;
                }else{
                    completedTaskHolder += `<div class="todo-container" id="todo-container"> 
                        <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" checked><p id="${task.ID}" class="task-item" data-list-group="${task.group_list}"> ${task.Task}</p>
                    </div>`;

                    completedTaskContainer.innerHTML = completedTaskHolder;
                }
                
            });
            
        })
}
// step
function getTaskStep(taskid){
    fetch('phpscript/getSteps.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({task_id: taskid})
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        let tStep = "";
        data.forEach(taskStep => {
            tStep += `<div class="taskStepContainer" id="taskStepContainer"><input type="checkbox" class="step-checkbox" id="step-checkbox" >
            <input type="text" id="${taskStep.ID}" class="stepsInputField" value="${taskStep.Steps}">
            </div>`

            stepsContainer.innerHTML = tStep;
        });
    })
}

function getList(){
   fetch('phpscript/getList.php')
        .then(response => {
            if(!response.ok){
                throw new Error('network not response')
            }
            return response.json();
        })
        .then(data => {
            let taskList = "";
            data.forEach(taskL => {
                taskList = `<div class="task-list-content" id="taskListContent">
                    <p id="${taskL.ID}">${taskL.List}</p>
                </div>`

                taskListContainer.innerHTML += taskList;
                listModal.innerHTML += taskList;
            })
            
        })
}

function deleteTask(todo){
    console.log('hello from function');
    fetch('phpscript/deleteTask.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({task_id: todo})
    })
}

function completedTask(todo, completed){
    fetch('phpscript/completedTask.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            task_id: todo,
            status: completed
        })
    })
}

function showModal(x,y){
    console.log(`this is x ${x} and y ${y}`);
    deleteModal.style.position = 'absolute';
    deleteModal.style.left = `${x}px`;
    deleteModal.style.top = `${y}px`;
    deleteModal.style.display = 'block';
}

function addDueDate(task, duedate){
    const data = {
        taskId: task,
        dueDate: duedate
    }
    fetch('phpscript/addDueDate.php',{
        method: 'POST',
        header: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

getTaskContainer.addEventListener("contextmenu", (event) => {
    const todo = event.target.closest('.todo-container');
    if(todo){
        event.preventDefault();
        //get id
        const p = todo.querySelector("p");
        const taskId = p.id;
        console.log(taskId);
        deleteBtn.dataset.taskId = taskId; 
        dueDate.dataset.taskId = taskId;
        moveTaskBtn.dataset.taskId = taskId;
        //modal loc
        const x = event.clientX;
        const y = event.clientY;
        // to position modal task list
        moveTaskBtn.dataset.xPosition = x;
        moveTaskBtn.dataset.yPosition = y;
        showModal(x,y)
    }
});

getTaskContainer.addEventListener("click", (event) => {
    rightSideMenu.style.display = 'block';
    const todo = event.target.closest('.todo-container');
    const taskSideMenu = document.getElementById('task-side-menu');
    
    if(todo){
        const p = todo.querySelector("p");
        const paraId = p.id;
        const pValue = p.textContent;
        fieldSideMenu.dataset.paraContent = pValue;
        fieldSideMenu.dataset.paraId = paraId;
        taskSideMenu.value = pValue;
        // put id on add step
        addTaskStep.dataset.taskId = p.id;
        getTaskStep(paraId);
    }

})

deleteBtn.addEventListener("click", () => {
    const taskId = deleteBtn.dataset.taskId;
    deleteModal.style.display = 'none';
    deleteTask(taskId);
    setTimeout(() => {
    getTask();
    }, 250);
  
});
// update todo
fieldSideMenu.addEventListener("keydown", (event) => {
    const paraContent = fieldSideMenu.dataset.paraContent;
    const paraId = fieldSideMenu.dataset.paraId;

    if(event.key === 'Enter'){
        event.preventDefault();
        const val = fieldSideMenu.value;
        
        if(val !== paraContent){
            const newUpdatedTask = document.getElementById("form-side-menu");
            const updatedTask = new FormData(newUpdatedTask);
            updatedTask.append('Id', paraId);
            fetch('phpscript/updateTask.php', {
                method: 'POST',
                body: updatedTask
            })
            
            setTimeout(() => {
            getTask();
            }, 250);
        }
    }
})

getTaskContainer.addEventListener("change", (event) => {
    const taskCheckBox = event.target.closest('.task-checkbox');
    
    if(taskCheckBox.checked){
        console.log("checked");
        const taskStatus = 1;
        const parentContainer = event.target.parentElement;
        const selectTask = parentContainer.querySelector('p');
        const taskId = selectTask.id;
        completedTask(taskId, taskStatus);
        console.log("id:", taskId);
        setTimeout(() => {
            getTask();
        }, 500);
    }
    
    if(!taskCheckBox.checked){
        console.log("unchecked");
        const taskStatus = 0;
        const parentContainer = event.target.parentElement;
        const selectTask = parentContainer.querySelector('p');
        const taskId = selectTask.id;
        completedTask(taskId, taskStatus);
        console.log("id:", taskId);
    }

})

completedTaskContainer.addEventListener("change", (event) => {
    const taskCheckBox = event.target.closest('.task-checkbox');
    
    if(!taskCheckBox.checked){
        console.log("unchecked");
        const taskStatus = 0;
        const parentContainer = event.target.parentElement;
        const selectTask = parentContainer.querySelector('p');
        const taskId = selectTask.id;
        completedTask(taskId, taskStatus);
        console.log("id:", taskId);

        setTimeout(() => {
            getTask();
        }, 250);
    }
})

addTaskStep.addEventListener("keydown", (event) => {
    if(event.key === 'Enter'){
        if(addTaskStep.value.trim() === ""){
            addTaskStep.setAttribute('required', '');
        }else{
            event.preventDefault();

            const data = {
                taskId : addTaskStep.dataset.taskId.trim(),
                stepValue : addTaskStep.value
            };
            fetch('phpscript/addTaskStep.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            addTaskStep.value = "";

            setTimeout(() => {
            getTaskStep(data.taskId);
            }, 250);

        }
        
    }
    
})
// due date
flatpickr(dueDate, {
    dateFormat: "Y-m-d",
    defaultDate: "today",
    closeOnSelect: false,

    onReady: function(selectedDates, dateStr, instance){
        const saveDueDate = document.createElement("button");
        saveDueDate.textContent = "Save";
        saveDueDate.type = "button";
        saveDueDate.classList.add("save-due-date");

        instance.calendarContainer.appendChild(saveDueDate);
        saveDueDate.addEventListener("click", event => {
            const selectedDate = instance.input.value;
            const taskId = dueDate.dataset.taskId;
            instance.close();
            addDueDate(taskId, selectedDate);
        })
    }
});

newListBtn.addEventListener("click", () => {
    const listField = document.createElement("input");
    listField.type = "text";
    listField.value = "Untitle List";
    listField.classList.add("list-field");

    taskListContainer.appendChild(listField);

    listField.focus();
    listField.select();

    listField.addEventListener("blur", () => {
        let listname = listField.value.trim();

        if(listname == ""){
            listname = "untitle list";
        }
        const data = {
            list: listname
        };

        fetch('phpscript/addList.php',{
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
    })
})

moveTaskBtn.addEventListener("mouseenter", () => {
    let x = 55;
    let y = 20;
    x += parseInt(moveTaskBtn.dataset.xPosition);
    y += parseInt(moveTaskBtn.dataset.yPosition);
    taskListModal.style.left = `${x}px`;
    taskListModal.style.top = `${y}px`;
    taskListModal.style.position = "absolute";
    taskListModal.style.display = "block";
    
})

moveTaskBtn.addEventListener("mouseleave", () => {
    taskListModal.style.display = "none";
})

taskListModal.addEventListener("mouseenter", () => {
    taskListModal.style.display = "block";
})

taskListModal.addEventListener("mouseleave", () => {
    taskListModal.style.display = "none";
})

listModal.addEventListener("click", (event) => {
    const listOption = event.target.closest(".task-list-content");
    
    if(listOption){
        const taskId = moveTaskBtn.dataset.taskId;
        const p = listOption.querySelector("p");
        const listId = p.id;

        const data = {
            taskId : taskId,
            listId: listId
        }

        fetch('phpscript/insertTaskOnList.php',{
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
})

taskListContainer.addEventListener("click", (event) => {
    const listOption = event.target.closest(".task-list-content");
    const p = listOption.querySelector("p");
    const listId = p.id;

    if(listOption){

    }
})

    