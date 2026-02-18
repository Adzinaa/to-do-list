const clearBtn = document.getElementById('clear-completed');
const todoList = document.getElementById('todo-list');

const input = document.querySelector('.todo-input');
const arrowIcon = document.querySelector('.arrow-icon');
const filterContainer = document.querySelector('.footer-middle');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all'; // retin filtrul activ

function applyFilter() {
    const allTasks = document.querySelectorAll('.task-item');

    allTasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');

        switch (currentFilter) {
            case 'all':
                task.style.display = 'block';
                break;
            case 'active':
                task.style.display = isCompleted ? 'none' : 'block';
                break;
            case 'completed':
                task.style.display = isCompleted ? 'block' : 'none';
                break;
        }
    });
}

/* functie pentru a detecta ce filtru am selectat */
filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        const clickedBtn = e.target;

        document.querySelector('.filter-btn.selected').classList.remove('selected');

        clickedBtn.classList.add('selected');

        currentFilter = clickedBtn.dataset.filter; 
        applyFilter();
    }
});

function updateClearButton(allTasks) {
    const completedTasksExist = Array.from(allTasks).some(task => task.classList.contains('completed'));

    if (completedTasksExist) {
        clearBtn.classList.remove('hidden');
        clearBtn.classList.add('show');
    } else {
        clearBtn.classList.add('hidden');
        clearBtn.classList.remove('show');
    }
}

function updateArrowState() {
    const allTasks = document.querySelectorAll('.task-item');
    const footer = document.getElementById('todo-footer');
    const todoCount = document.getElementById('todo-count');

    /*vf daca am taskuri*/
    if (!allTasks.length) {
        footer.style.display = 'none';
        arrowIcon.style.display = 'none';
        arrowIcon.classList.remove('active');
        return;
    } else {
        arrowIcon.style.display = 'inline-block';
        footer.style.display = 'flex';
    }

    // calc cate taskuri nu s complete
    // transform lista de taskuri intr un array pt a putea fol filter
    const incompleteTasks = Array.from(allTasks).filter(task => !task.classList.contains('completed'));
    const count = incompleteTasks.length;
    todoCount.textContent = `${count} ${count === 1 ? 'item' : 'items'} left`;

    const allCompleted = Array.from(allTasks).every(task => task.classList.contains('completed'));

    if (allCompleted) {
        arrowIcon.classList.add('active');
    } else {
        arrowIcon.classList.remove('active');
    }

    updateClearButton(allTasks);
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
    applyFilter();
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
        applyFilter();
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
            <span class="circle-icon"></span> 
            <span class="task-text-display">${text}</span>
            <span class="delete-btn">x</span>
        </div>
    `;

    todoList.appendChild(taskItem);
    updateArrowState();
    applyFilter();
}

todoList.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('task-text-display')) {
        const textElement = e.target;
        const taskRow = textElement.closest('.task-item');
        const currentText = textElement.textContent;

        taskRow.classList.add('editing');

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = currentText;

        textElement.style.display = 'none';
        taskRow.querySelector('.task-content').insertBefore(editInput, textElement);
        
        editInput.focus();

        const saveEdit = () => {
            const newText = editInput.value.trim();
            if (newText !== "") {
                textElement.textContent = newText;
            }
            taskRow.classList.remove('editing');
            editInput.remove();
            textElement.style.display = 'block';
        };

        editInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                saveEdit();
            }
        });

        editInput.addEventListener('blur', () => {
            saveEdit();
        });

        editInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                editInput.remove();
                textElement.style.display = 'block';
            }
        });
    }
});

updateArrowState();