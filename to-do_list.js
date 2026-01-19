const input = document.querySelector('.todo-input');
const todoList = document.getElementById('todo-list');
const arrowIcon = document.querySelector('.arrow-icon');
const clearBtn = document.getElementById('clear-completed')

function updateArrowState() {
    const allTasks = document.querySelectorAll('.task-item');
    const footer = document.getElementById('todo-footer');
    const todoCount = document.getElementById('todo-count');


    if (allTasks.length === 0) {
        footer.style.display = 'none';
        arrowIcon.style.display = 'none';
        arrowIcon.classList.remove('active');
        return;
    } else {
        arrowIcon.style.display = 'inline-block';
        footer.style.display = 'flex';
    }

    //calc cate taskuri nu s complete
    const incompleteTasks = Array.from(allTasks).filter(task => !task.classList.contains('completed'));
    const count = incompleteTasks.length;
    todoCount.textContent = `${count} ${count === 1 ? 'item' : 'items'} left`;

    const allCompleted = Array.from(allTasks).every(task => task.classList.contains('completed'));

    if (allCompleted) {
        arrowIcon.classList.add('active');
    } else {
        arrowIcon.classList.remove('active');
    }

    // clear completed
    const completedTasksExist = Array.from(allTasks).some(task => task.classList.contains('completed'));
    
    if (completedTasksExist) {
        clearBtn.classList.remove('hidden');
        clearBtn.classList.add('show');
    } else {
        clearBtn.classList.add('hidden');
        clearBtn.classList.remove('show');
    }
}

clearBtn.addEventListener('click', function() {
    const completedTasks = document.querySelectorAll('.task-item.completed');
    completedTasks.forEach(task => task.remove());
    
    updateArrowState();
});

arrowIcon.addEventListener('click', function() {
    const allTasks = document.querySelectorAll('.task-item');
    
    const hasIncomplete = Array.from(allTasks).some(task => !task.classList.contains('completed'));

    allTasks.forEach(task => {
        if (hasIncomplete) {
            task.classList.add('completed');
        } else {
            task.classList.remove('completed');
        }
    });

    updateArrowState();
});

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const taskText = input.value.trim();

        if (taskText !== "") {
            addTask(taskText);
            input.value = "";
        }
    }
});

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('circle-icon')) {
        const taskRow = e.target.closest('.task-item');
        taskRow.classList.toggle('completed');
    }

    if (e.target.classList.contains('delete-btn')) {
        const taskRow = e.target.closest('.task-item');
        taskRow.remove();
    }

    updateArrowState();
});

function addTask(text) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
        <div class="task-content">
            <span class="circle-icon" tabindex="0"></span> 
            <span class="task-text-display">${text}</span>
            <span class="delete-btn">x</span>
        </div>
    `;

    todoList.appendChild(taskItem);
    updateArrowState();
}

updateArrowState();