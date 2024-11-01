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

    const addTask = () => {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => {
                listItem.classList.toggle('done');
            });

            const taskLabel = document.createElement('span');
            taskLabel.textContent = taskText;
            taskLabel.className = 'task-label';

            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'x';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(taskLabel);
            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
            todoInput.value = '';
        }
    };

    addTodoButton.addEventListener('click', addTask);

    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Display the date when the page loads
    displayDate();
}); 