const input = document.querySelector('.todo-input');
const todoList = document.getElementById('todo-list');

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const taskText = input.value.trim();

        if (taskText !== "") {
            addTask(taskText);
            input.value = "";
        }
    }
});

function addTask(text) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
        <div class="task-content">
            <span class="circle-icon"></span> 
            <span class="task-text-display">${text}</span>
        </div>
    `;

    todoList.appendChild(taskItem);
}