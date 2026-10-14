const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form");

addTask.addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){
        event.preventDefault();
        
        const inputValue = new FormData(insertTaskForm);
        
        fetch('phpscript/insertTask.php', {
            method: 'POST',
            body: inputValue
        });
        addTask.value = '';
    }
});