const addTask = document.getElementById("input-task");
const insertTaskForm = document.getElementById("insert-task-form");
const getTaskContainer = document.getElementById("task-container");

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
            }, 500);
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
            let dataHolder = '';
            data.forEach(task => {
                dataHolder += `<p>${task.Task}</p>`
            });
            getTaskContainer.innerHTML = dataHolder;
        })
}

getTask();