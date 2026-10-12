const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form")

addTask.addEventListener('keypress', (event)=>{
    if(event.key === 'enter'){
        event.preventDefault();
        insertTaskForm.submit();
    }
})