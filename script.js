const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form");
const getTaskContainer = document.getElementById("task-container");
const deleteModal = document.querySelector(".delete-modal");

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

// function deleteTask(todo){
//     const deleteBtn = document.getElementById("delete-task-button");
//     deleteBtn.addEventListener("click", (e) =>{
//         fetch('phpscript/deleteTask.php',{
//             method: 'DELETE',
//             body: todo
//         })
//     })
// }

getTaskContainer.addEventListener("contextmenu", (event) => {
    const todo = event.target.closest('.todo-container');
    if(todo){
        event.preventDefault();
       
        const p = todo.querySelector("p");
        console.log(p.id);

        const x = event.clientX;
        const y = event.clientY;

        console.log(`this is x ${x} and y ${y}`);
        deleteModal.style.position = 'absolute';
        deleteModal.style.left = `${x}px`;
        deleteModal.style.top = `${y}px`;
        deleteModal.style.display = 'block';


    }
});


