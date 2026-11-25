const addTask = document.getElementById("input-task");
const getTaskContainer = document.getElementById("task-container");
const deleteModal = document.querySelector(".delete-modal");
const deleteBtn = document.getElementById("delete-task-button");
const rightSideMenu = document.getElementById("side-menu");
const fieldSideMenu = document.getElementById("task-side-menu");
const taskCheckBox = document.getElementById("task-checkbox");
const completedTaskContainer = document.getElementById("completedTask");
const addTaskStep = document.getElementById("step-side-menu");
const stepsContainer = document.getElementById("stepsContainer");
const dueDate = document.getElementById("dueDate");
const newListBtn = document.getElementById("newList");
const taskListContainer = document.getElementById("taskList");
const taskListModal = document.getElementById("taskListOuter")
const moveTaskBtn = document.getElementById("moveTask");
const taskListContent = document.getElementById("taskListContent");
const listModal = document.getElementById("taskListModalInner");
const modalOnList = document.getElementById("modalOnList");
const deleteOnList = document.getElementById("deleteList");
const leftListField = document.getElementById("newListField");
const completedBtn = document.getElementById("completedBtn");
const completedTaskParent = document.getElementById("completedTaskParent");
const deleteSteps = document.getElementById("deleteSteps");
const allTask = document.getElementById("allTask");
const myDayTask = document.getElementById("myDayTask");


// to know if completed task is hidden
let isHide = "";

getTask();
getList();
//add
addTask.addEventListener('keydown', function(event) {
    if(addTask.value.trim() === ""){
       //to required
    }else{
        if(event.key === 'Enter'){
            event.preventDefault();
            const currentDate = new Date().toISOString().slice(0, 10);
            const inputValue = addTask.value;

            const data = {
                date: currentDate,
                task: inputValue
            }
            
            fetch('phpscript/insertTask.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            addTask.value = '';
            
            setTimeout(() => {
            getTask();
            }, 250);
            
        }
    }
});
// get task
function getTask(request){
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
            let completeTask = "";
            let noTask = "";
            const isNum  = typeof request;
            const currentDate = new Date().toISOString().slice(0, 10);
            
            if(data.length === 0){
                noTask += `<div><h1>No Task</h1></div>`;
                getTaskContainer.innerHTML = noTask;
            }else{
                    // clearing container on call
                    getTaskContainer.innerHTML = "";
                    completedTaskContainer.innerHTML = "";
                    data.forEach(task => {
                    const dateCreated = task.date_created;
                    // get all task
                    if(request === "all task"){
                        const status = parseInt(task.Completed);
                        if(status === 0){
                            taskHolder += `<div class="todo-container" id="todo-container"> 
                                <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" data-list-group="${task.group_list}"><p id="${task.ID}" class="task-item"> ${task.Task}</p>
                            </div>`;
                            
                            getTaskContainer.innerHTML = taskHolder;
                        }else{
                            completeTask += `<div class="todo-container" id="todo-container"> 
                                <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" checked><p id="${task.ID}" class="task-item" data-list-group="${task.group_list}"> ${task.Task}</p>
                            </div>`;

                            completedTaskContainer.innerHTML = completeTask;
                            
                            completedBtn.classList.remove("hide");
                            completedTaskParent.classList.remove("hide");
                        }
                    }else if(isNum === "number"){
                       if(request === parseInt(task.group_list)){
                            const status = parseInt(task.Completed);
                            if(status === 0){
                                taskHolder += `<div class="todo-container" id="todo-container"> 
                                    <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" data-list-group="${task.group_list}"><p id="${task.ID}" class="task-item"> ${task.Task}</p>
                                </div>`;
                                
                                getTaskContainer.innerHTML = taskHolder;
                            }else{
                                completeTask += `<div class="todo-container" id="todo-container"> 
                                    <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" checked><p id="${task.ID}" class="task-item" data-list-group="${task.group_list}"> ${task.Task}</p>
                                </div>`;

                                completedTaskContainer.innerHTML = completeTask;
                                
                                completedBtn.classList.remove("hide");
                                completedTaskParent.classList.remove("hide");
                            }
                       }
                    }else {
                        if(dateCreated === currentDate){
                            const status = parseInt(task.Completed);
                            if(status === 0){
                                taskHolder += `<div class="todo-container" id="todo-container"> 
                                    <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" data-list-group="${task.group_list}"><p id="${task.ID}" class="task-item"> ${task.Task}</p>
                                </div>`;
                                
                                getTaskContainer.innerHTML = taskHolder;
                                
                            }else{
                                
                                completeTask += `<div class="todo-container" id="todo-container"> 
                                    <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" checked><p id="${task.ID}" class="task-item" data-list-group="${task.group_list}"> ${task.Task}</p>
                                </div>`;

                                completedTaskContainer.innerHTML = completeTask;
                                
                                completedBtn.classList.remove("hide");
                                completedTaskParent.classList.remove("hide");
                                
                            }
                        }  
                    }
                     
                });
                const numberOfChild = completedTaskContainer.children.length;
                const numberOfTask = getTaskContainer.children.length;

                if(isHide){
                    completedTaskParent.classList.add("hide");
                    isHide = "";
                }

                if(numberOfChild === 0){
                    completedBtn.classList.add("hide");
                    completedTaskParent.classList.add("hide");
                }

                if(numberOfTask === 0){
                    getTaskContainer.classList.add("hide");
                }else{
                    getTaskContainer.classList.remove("hide");
                }

            }
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
        let tStep = ""
        if(data.length === 0){
            tStep = ""
            stepsContainer.innerHTML = tStep;
            console.log("im zero");
            stepsContainer.style.display = "none";
        }else{
            stepsContainer.style.display = "block";
            data.forEach(taskStep => {
                if(taskStep.Status === 1){
                    tStep += `<div class="taskStepContainer" id="taskStepContainer"><input type="checkbox" class="step-checkbox" id="step-checkbox" checked>
                        <input type="text" id="${taskStep.ID}" class="stepsInputField" value="${taskStep.Steps}">
                    </div>`

                    stepsContainer.innerHTML = tStep;
                }else{
                    // tStep = "";
                    tStep += `<div class="taskStepContainer" id="taskStepContainer"><input type="checkbox" class="step-checkbox" id="step-checkbox">
                        <input type="text" id="${taskStep.ID}" class="stepsInputField" value="${taskStep.Steps}">
                    </div>`

                    stepsContainer.innerHTML = tStep;
                }
            
            });
        }
      
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
                    <p class="listContent" id="${taskL.ID}">${taskL.List}</p>
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

function completedSteps(todo, completed){
    fetch('phpscript/completedStep.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            list_id: todo,
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
// to fix(2 listener dapat keydown at blur sa list input field)
function twoEvent(event, input){
    const inputValue = input.value.trim()
    const eventType = event.type;
    const keyPress = event.key
    getListValue(inputValue)
}

function getListValue(listValue){

    if(listValue == ""){
        listValue = "untitled list";
    }
    const data = {
        list: listValue
    };

    fetch('phpscript/addList.php',{
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
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
// checkbox listener
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
        }, 200);
    }
    
    // if(!taskCheckBox.checked){
    //     console.log("unchecked");
    //     const taskStatus = 0;
    //     const parentContainer = event.target.parentElement;
    //     const selectTask = parentContainer.querySelector('p');
    //     const taskId = selectTask.id;
    //     completedTask(taskId, taskStatus);
    //     console.log("id:", taskId);
    //     setTimeout(() => {
    //         getTask();
    //     }, 500);
    // }

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
    leftListField.classList.remove("hide");
    leftListField.focus();
    leftListField.select();
})

leftListField.addEventListener("blur", (event) => twoEvent(event, leftListField));
// leftListField


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
    const p = listOption.querySelector(".listContent");
    const listId = parseInt(p.id);

    if(listOption){
        getTask(listId);
        // fetch('phpscript/getTask.php')
        // .then(response => {
        //     if(!response.ok){
        //         throw new Error('network not response')
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     let unfinishTask = "";
        //     let completedTask = "";
        //     data.forEach(task => {
        //         const listTaskId = parseInt(task.group_list);
                
        //         if(data.length === 0){
        //             getTaskContainer.innerHTML = "No task";
        //         }else{
        //             if(listId === listTaskId){
        //                 const status = parseInt(task.Completed);
        //                 if(status === 0){
        //                     unfinishTask += `<div class="todo-container" id="todo-container"> 
        //                         <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" data-list-group="${task.group_list}"><p id="${task.ID}" class="task-item"> ${task.Task}</p>
        //                     </div>`;
        //                     getTaskContainer.innerHTML = unfinishTask;
        //                 }else{
        //                     completedTask += `<div class="todo-container" id="todo-container"> 
        //                         <input type="checkbox" id="task-checkbox" name="task-checkbox" class="task-checkbox" checked><p id="${task.ID}" class="task-item" data-list-group="${task.group_list}"> ${task.Task}</p>
        //                     </div>`;
        //                     completedTaskContainer.innerHTML = completedTask;
        //                 }
        //             }
        //         }
        //     });
            
        // })
    }
})

taskListContainer.addEventListener("contextmenu", (event) =>{
     const listOption = event.target.closest(".task-list-content");
     
     if(listOption){
        event.preventDefault();
        const x = event.clientX;
        const y = event.clientY;
        
        modalOnList.style.left = `${x}px`;
        modalOnList.style.top = `${y}px`;
        modalOnList.style.position = "absolute";
        modalOnList.style.display = "block";

        const p = listOption.querySelector("p");
        const listId = parseInt(p.id);
        deleteOnList.dataset.LId = listId;
     }
})

deleteOnList.addEventListener("click", () => {
    const listId = deleteOnList.dataset.LId;
    
    const data = {
        Id:listId
    }

    fetch("phpscript/deleteList.php",{
        method: "POST",
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
})

stepsContainer.addEventListener("change", (event) => {
    const stepCheckBox = event.target.closest(".step-checkbox");
    
    if(stepCheckBox.checked){
        const status = 1;
        const parentContainer = event.target.parentElement;
        const accessId = parentContainer.querySelector(".stepsInputField");
        const stepId = accessId.id;
        completedSteps(stepId, status);
    }
    if(!stepCheckBox.checked){
        const status = 0;
        const parentContainer = event.target.parentElement;
        const accessId = parentContainer.querySelector(".stepsInputField");
        const stepId = accessId.id;
        completedSteps(stepId, status);
    }

})

stepsContainer.addEventListener("contextmenu", (event) => {
    const taskStepContainer = event.target.closest(".taskStepContainer");
    const stepsDeleteModal = document.getElementById("modalOnSteps");
    const x = event.clientX;
    const y = event.clientY;

    event.preventDefault();

    stepsDeleteModal.style.position = 'absolute';
    stepsDeleteModal.style.left = `${x}px`;
    stepsDeleteModal.style.top = `${y}px`;
    stepsDeleteModal.style.display = 'block';
    
    if(taskStepContainer){
        const stepsId = taskStepContainer.querySelector(".stepsInputField");
        const Id = parseInt(stepsId.id);
        deleteSteps.dataset.stepId = Id;
    }
})

deleteSteps.addEventListener("click", () => {
    const ID = deleteSteps.dataset.stepId;
    const data = {
        stepsID : ID
    };

    fetch("phpscript/deleteStep.php",{
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
})

completedBtn.addEventListener("click", () => {
    const visible = completedTaskParent.checkVisibility()

    if(visible){
        completedTaskParent.classList.add("hide");
        isHide = true;
    }else{
        completedTaskParent.classList.remove("hide");
        isHide = false;
    }
})

// click on r-side-menu
allTask.addEventListener("click", () => {
    getTask("all task");
})

myDayTask.addEventListener("click", () => {
    getTask("my day");
})