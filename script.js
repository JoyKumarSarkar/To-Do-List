let totalTasks = 0; 

// Function to update the task counter
function updateTaskCounter() {
    document.getElementById('task-counter').textContent = `Total Tasks: ${totalTasks}`;
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dateAdded: new Date().toLocaleString()
        };

        // Add task to the pending list
        renderTask(task);
        taskInput.value = '';

        totalTasks++; // Increment total tasks
        updateTaskCounter(); // Update the task counter
    }
}

// Function to render a task to the pending or completed list
function renderTask(task) {
    const taskList = task.completed ? document.getElementById('completed-tasks') : document.getElementById('pending-tasks');

    const listItem = document.createElement('li');
    listItem.dataset.id = task.id;
    listItem.className = task.completed ? 'completed' : '';

    listItem.innerHTML = `
        ${task.text} <small>(Added on: ${task.dateAdded})</small>
        <div class="task-actions">
            ${!task.completed ? `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>` : ''}
            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    taskList.appendChild(listItem);
}

// Function to mark a task as completed
function completeTask(id) {
    const taskItem = document.querySelector(`[data-id='${id}']`);
    taskItem.remove();

    const completedTask = {
        id: id,
        text: taskItem.textContent.split('(Added')[0].trim(),
        completed: true,
        dateAdded: taskItem.querySelector('small').textContent.replace('Added on: ', '').trim()
    };

    renderTask(completedTask);
}

// Function to edit a task
function editTask(id) {
    const taskItem = document.querySelector(`[data-id='${id}']`);
    const taskText = prompt('Edit your task:', taskItem.textContent.split('(Added')[0].trim());

    if (taskText !== null && taskText.trim() !== '') {
        taskItem.remove();

        const updatedTask = {
            id: id,
            text: taskText.trim(),
            completed: taskItem.classList.contains('completed'),
            dateAdded: taskItem.querySelector('small').textContent.replace('Added on: ', '').trim()
        };

        renderTask(updatedTask);
    }
}

// Function to delete a task
function deleteTask(id) {
    const taskItem = document.querySelector(`[data-id='${id}']`);
    taskItem.remove();

    totalTasks--; // Decrement total tasks
    updateTaskCounter(); // Update the task counter
}

// Function to delete all tasks
function deleteAllTasks() {
    const pendingTasks = document.getElementById('pending-tasks');
    const completedTasks = document.getElementById('completed-tasks');

    // Remove all tasks from both lists
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    // Reset total tasks and update the counter
    totalTasks = 0;
    updateTaskCounter();
}
