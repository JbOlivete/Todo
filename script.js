const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form");
const getTaskContainer = document.getElementById("task-container");
const deleteModal = document.querySelector(".delete-modal");
const deleteBtn = document.getElementById("delete-task-button");
const rightSideMenu = document.getElementById("side-menu");
const fieldSideMenu = document.getElementById("task-side-menu")

getTask();

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
            if (data.length === 0){
                getTaskContainer.innerHTML = '<p>no task</p>';
                return;
            }
            let dataHolder;
            data.forEach(task => {
                dataHolder += `<div class="todo-container" id="todo-container"><p id="${task.ID}" class="task-item"> ${task.Task}</p></div>`;
            });
            getTaskContainer.innerHTML = dataHolder;
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

function showModal(x,y){
    console.log(`this is x ${x} and y ${y}`);
    deleteModal.style.position = 'absolute';
    deleteModal.style.left = `${x}px`;
    deleteModal.style.top = `${y}px`;
    deleteModal.style.display = 'block';
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
        //modal loc
        const x = event.clientX;
        const y = event.clientY;
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
    }

})

deleteBtn.addEventListener("click", () => {
    const taskId = deleteBtn.dataset.taskId;
    deleteModal.style.display = 'none';
    setTimeout(() => {
    getTask();
    }, 250);
    deleteTask(taskId);
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