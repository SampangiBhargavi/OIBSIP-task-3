let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            text: taskText,
            id: Date.now(),
            completed: false
        };
        pendingTasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach(task => {
        const listItem = createTaskElement(task);
        pendingTasksList.appendChild(listItem);
    });

    completedTasks.forEach(task => {
        const listItem = createTaskElement(task);
        completedTasksList.appendChild(listItem);
    });
}

function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.id = task.id;

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
        taskText.classList.add('completed');
    }

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('task-buttons');

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
    completeButton.onclick = () => toggleTaskCompletion(task.id);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteTask(task.id);

    buttonsContainer.appendChild(completeButton);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    listItem.appendChild(taskText);
    listItem.appendChild(buttonsContainer);

    return listItem;
}

function toggleTaskCompletion(taskId) {
    const task = pendingTasks.find(task => task.id === taskId) || completedTasks.find(task => task.id === taskId);

    if (task.completed) {
        task.completed = false;
        pendingTasks.push(task);
        completedTasks = completedTasks.filter(t => t.id !== taskId);
    } else {
        task.completed = true;
        completedTasks.push(task);
        pendingTasks = pendingTasks.filter(t => t.id !== taskId);
    }

    renderTasks();
}

function editTask(taskId) {
    const task = pendingTasks.find(task => task.id === taskId) || completedTasks.find(task => task.id === taskId);
    const newTaskText = prompt('Edit your task:', task.text);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        task.text = newTaskText.trim();
    }

    renderTasks();
}

function deleteTask(taskId) {
    pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    completedTasks = completedTasks.filter(task => task.id !== taskId);

    renderTasks();
}

document.addEventListener('DOMContentLoaded', renderTasks);