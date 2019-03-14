
// Assigning DOM elements to different constants
const taskTitle=document.querySelector('#task-title');
const taskList=document.querySelector('.task-list');
const taskForm=document.querySelector('#task-form');
const addTask=document.querySelector('#add-task');
const clearTasks=document.querySelector('#clear-tasks');
const taskFilter=document.querySelector('#task-filter');
const taskDeadline=document.querySelector('#task-deadline');
loadEventListeners();

function loadEventListeners(){
// // The event that gets the tasks from local storage when the DOM is loaded
document.addEventListener('DOMContentLoaded', getTasks);

// The event that triggers the creation of a task
taskForm.addEventListener('submit', createTask);

// The event that triggers deletion of a task
taskList.addEventListener('click', deleteItem);

// The event that triggers the deletion of all the tasks
clearTasks.addEventListener('click', clearItems);

// The event that filters the results
taskFilter.addEventListener('keyup', filterTasks);

}



// The function that creates a task-list-item and places it dinamically in the DOM
function createTask(e){
    
    if(taskTitle.value === ''){
        alert('Add a task title');
    } 
    const li=document.createElement('li');
    li.id='task-list-item';
    const deadline=document.createElement('span');
    deadline.textContent=taskDeadline.value;
    deadline.id='task-deadline-output';
    li.appendChild(deadline);
    const taskTitleOutput=document.createElement('span');
    taskTitleOutput.textContent=taskTitle.value;
    taskTitleOutput.id='task-title-output';
    li.appendChild(taskTitleOutput);
    const link=document.createElement('a');
    link.className='delete-btn';
    link.innerHTML='<i class="fas fa-trash-alt"></i>';
    link.style.color='white';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskLocally(taskTitle.value);
    storeDeadlineLocally(taskDeadline.value);
    taskDeadline.value='';
    taskTitle.value='';
    e.preventDefault();
    
}

// The function that gets the tasks from localStorage to the DOM
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    let deadlines;
    if(localStorage.getItem('deadlines') === null){
        deadlines=[];
    } else{
        deadlines=JSON.parse(localStorage.getItem('deadlines'));
    }
    
    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.id='task-list-item';
    
        deadlines.forEach(function(dl){
        const deadline=document.createElement('span');
        deadline.textContent=dl;
        deadline.id='task-deadline-output';
        li.appendChild(deadline);
    })
        const taskTitleOutput=document.createElement('span');
        taskTitleOutput.textContent=task;
        taskTitleOutput.id='task-title-output';
        li.appendChild(taskTitleOutput);
        const link=document.createElement('a');
        link.className='delete-btn';
        link.innerHTML='<i class="fas fa-trash-alt"></i>';
        link.style.color='white';
        li.appendChild(link);
        taskList.appendChild(li);
    })

    
}

function storeTaskLocally(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function storeDeadlineLocally(deadline){
    let deadlines;
    if(localStorage.getItem('deadlines') === null){
        deadlines=[];
    } else{
        deadlines=JSON.parse(localStorage.getItem('deadlines'));
    }
    deadlines.push(deadline);

    localStorage.setItem('deadlines', JSON.stringify(deadlines));
}

function deleteItem(e){
    if(e.target.parentElement.classList.contains('delete-btn')){
        e.target.parentElement.parentElement.remove();
        deleteItemLocally(e.target.parentElement.parentElement);
    }

    
}

function deleteItemLocally(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    
    let deadlines;
    if(localStorage.getItem('deadlines') === null){
        deadlines=[];
    } else{
        deadlines=JSON.parse(localStorage.getItem('deadlines'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.firstChild.nextSibling.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));

    deadlines.forEach(function(deadline, index){
        if(taskItem.firstChild.textContent === deadline){
            deadlines.splice(index, 1);
        }
    })

    localStorage.setItem('deadlines', JSON.stringify(deadlines));
}


function clearItems(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearItemsLocally();
}

function clearItemsLocally(){
  localStorage.clear();
}

function filterTasks(e){
    const filterText=e.target.value.toLowerCase();

    document.querySelectorAll('#task-list-item').forEach(function(task){
        const title=task.firstChild.nextSibling.textContent;
        if(title.toLowerCase().indexOf(filterText) !== -1){
            task.style.display='flex';
        } else {
            task.style.display='none';
        }
    });
}

