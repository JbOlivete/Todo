const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form");
const getTaskContainer = document.getElementById("task-container");
const deleteModal = document.querySelector(".delete-modal");
const deleteBtn = document.getElementById("delete-task-button");

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
        
        console.log(`this is x ${x} and y ${y}`);
        deleteModal.style.position = 'absolute';
        deleteModal.style.left = `${x}px`;
        deleteModal.style.top = `${y}px`;
        deleteModal.style.display = 'block';
        
    }
});

deleteBtn.addEventListener("click", () => {
    const taskId = deleteBtn.dataset.taskId;
    setTimeout(() => {
    getTask();
    }, 250);
    deleteTask(taskId);
});


