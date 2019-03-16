
// Assigning DOM elements to different constants
const taskTitle=document.querySelector('#task-title');
const taskList=document.querySelector('.task-list');
const taskForm=document.querySelector('#task-form');
const addTask=document.querySelector('#add-task');
const clearTasks=document.querySelector('#clear-tasks');
const taskFilter=document.querySelector('#task-filter');
const taskDeadline=document.querySelector('#task-deadline');
const taskListItem=document.querySelector('#task-list-item');
const taskDescription=document.querySelector('#task-description');
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

// The event that triggers the accordion
taskList.addEventListener('click', showAccordion);

}

// The function that creates a task-list-item and places it dinamically in the DOM
function createTask(e){
    
    // Alert for empty input field
    if(taskTitle.value === ''){
        alert('Add a task title');
    }
    // Creating the list item 
    const li=document.createElement('li');
    li.id='task-list-item';
    // Creating & appending the deadline output 
    const deadline=document.createElement('span');
    deadline.textContent=taskDeadline.value;
    deadline.id='task-deadline-output';
    li.appendChild(deadline);
    // Creating & appending the taskTitle output
    const taskTitleOutput=document.createElement('span');
    taskTitleOutput.textContent=taskTitle.value;
    taskTitleOutput.id='task-title-output';
    li.appendChild(taskTitleOutput);
    // Creating & appending the delete button for each list item
    const link=document.createElement('a');
    link.className='delete-btn';
    link.innerHTML='<i class="fas fa-trash-alt"></i>';
    link.style.color='white';
    // Appending the delete buttons to the list items
    li.appendChild(link);
    // Appending the list items to the list
    taskList.appendChild(li);
    // Storing the tasks/deadlines in the localStorage
    storeItemLocally(taskTitle.value, taskDescription.value, taskDeadline.value);
    // storeDescriptionLocally(taskDescription.value);
    // Assigning empty string to input items after the task was created
    taskDeadline.value='';
    taskTitle.value='';
    taskDescription.value='';
    // Prevent the default of the event
    e.preventDefault();
    
}

// The function that gets the tasks from localStorage to the DOM
function getTasks(){
    // Creating a 'tasks' variable that holds all the taskTitles
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    
    // Creating a 'deadlines' variable that holds all the deadlines
    let deadlines;
    if(localStorage.getItem('deadlines') === null){
        deadlines=[];
    } else{
        deadlines=JSON.parse(localStorage.getItem('deadlines'));
    }

    // Creating each element using the data from localStorage
    let i=0;
    tasks.forEach(function(task){
        // List item
        const li=document.createElement('li');
        li.id='task-list-item';
        // Deadline
        const deadline=document.createElement('span');
        deadline.textContent=deadlines[i];
        deadline.id='task-deadline-output';
        li.appendChild(deadline);
        // Task title
        const taskTitleOutput=document.createElement('span');
        taskTitleOutput.textContent=task;
        taskTitleOutput.id='task-title-output';
        li.appendChild(taskTitleOutput);
        // Delete btn
        const link=document.createElement('a');
        link.className='delete-btn';
        link.innerHTML='<i class="fas fa-trash-alt"></i>';
        link.style.color='white';
        // appending
        li.appendChild(link);
        taskList.appendChild(li);
        // Incrementing i so it jumps to the next value in the localStorage key 'deadlines'
        i++;
    });

    
}

// This function stores taskTitles, taskDescriptions and taskDeadlines in the localStorage
function storeItemLocally(task, description, deadline){
    // Tasks variable
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    // Pushing each new task in the localStorage
    tasks.push(task);
    
    let descriptions;
    if(localStorage.getItem('tasks') === null){
        descriptions=[];
    } else{
        descriptions=JSON.parse(localStorage.getItem('descriptions'));
    }
    // Pushing each new task in the localStorage
    descriptions.push(description);
    
    let deadlines;
    if(localStorage.getItem('deadlines') === null){
        deadlines=[];
    } else{
        deadlines=JSON.parse(localStorage.getItem('deadlines'));
    }
    // Pushing each new deadline in the localStorage
    deadlines.push(deadline);
    
    // Setting the 'tasks' key to tasks variable
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('descriptions', JSON.stringify(descriptions));
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
}

// This function deletes the items from the taskBox
function deleteItem(e){
    if(e.target.parentElement.classList.contains('delete-btn')){
        e.target.parentElement.parentElement.remove();
        deleteItemLocally(e.target.parentElement.parentElement);
    }
}

// This function deletes the items from the localStorage
function deleteItemLocally(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    
    let descriptions;
    if(localStorage.getItem('tasks') === null){
        descriptions=[];
    } else{
        descriptions=JSON.parse(localStorage.getItem('tasks'));
    }

    let deadlines;
    if(localStorage.getItem('deadlines') === null){
        deadlines=[];
    } else{
        deadlines=JSON.parse(localStorage.getItem('deadlines'));
    }
    
    // Each taskTitle is removed from the localStorage
    tasks.forEach(function(task, index){
        if(taskItem.firstChild.nextSibling.textContent === task){
            tasks.splice(index, 1);
            descriptions.splice(index, 1);
            deadlines.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('descriptions', JSON.stringify(descriptions));
    localStorage.setItem('deadlines', JSON.stringify(deadlines));
    
}

// The function that clears the taskBox of all the tasks created
function clearItems(){
    // Every time it encounters a firstChild (itemlist), it deletes it
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearItemsLocally();
}

// The function that clears the localStorage of all the items
function clearItemsLocally(){
  localStorage.clear();
}


// The function that filters the task based on the taskTitle
function filterTasks(e){
    // The filter input field value 
    const filterText=e.target.value.toLowerCase();

    document.querySelectorAll('#task-list-item').forEach(function(task){
        // Assigning each titleName to a variable
        const title=task.firstChild.nextSibling.textContent;
        // Checking if the filter matches any of the taskTitles
        if(title.toLowerCase().indexOf(filterText) !== -1){
            task.style.display='flex';
        } else {
            task.style.display='none';
        }
    });
}

// The function that shows the accordion for task description
function showAccordion(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    

    const p=document.createElement('p');
    p.id='task-description-accordion';
    p.textContent=JSON.parse(localStorage.getItem('descriptions'))[tasks.indexOf(e.target.firstChild.nextSibling.textContent)];
    taskList.insertBefore(p, e.target.nextSibling);
}

