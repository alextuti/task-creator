const taskTitle=document.querySelector('#task-title');
const taskList=document.querySelector('ul');
document.querySelector('form .task-form').addEventListener('submit', function(){
    let li=document.createElement('li');
    li.id='task-list-item';
    li.appenChild(document.createTextNode(taskTitle.value));
    let link=document.createElement('a');
    link.innerHTML='<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
});