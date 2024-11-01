document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const dateHeader = document.getElementById('date-header');

    // Function to display today's date
    const displayDate = () => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateHeader.textContent = today.toLocaleDateString(undefined, options);
    };

    const saveTasks = () => {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-label').textContent,
                done: item.classList.contains('done')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.done);
        });
    };

    const addTask = (taskText, done = false) => {
        if (taskText !== '') {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = done;
            checkbox.addEventListener('change', () => {
                listItem.classList.toggle('done');
                saveTasks();
            });

            const taskLabel = document.createElement('span');
            taskLabel.textContent = taskText;
            taskLabel.className = 'task-label';

            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'x';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
                saveTasks();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(taskLabel);
            listItem.appendChild(deleteButton);
            if (done) listItem.classList.add('done');
            todoList.appendChild(listItem);
            todoInput.value = '';
            saveTasks();
        }
    };

    addTodoButton.addEventListener('click', () => addTask(todoInput.value));

    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask(todoInput.value);
        }
    });

    // Load tasks when the page loads
    loadTasks();
    displayDate();
}); 