let tasks = [];

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const priorityValues = {
    "very-high": 4,
    "high": 3,
    "medium": 2,
    "low": 1
};

function addTask() {
    const taskInput = document.getElementById('todoInput');
    const prioritySelect = document.getElementById('prioritySelect');

    if(taskInput.value.trim() === ''){
        alert("할 일을 작성해주세요");
        taskInput.value = '';
    } else {
        const task = {
            id: Date.now(),
            text: taskInput.value,
            priority: prioritySelect.value,
            completed: false,
        };
    
        tasks.push(task);
    
        taskInput.value = '';
    
        renderTasks();
        saveTasks();
    }
}

function filterTasks(tasks, filterValue) {
    let filteredTasks = tasks;

    if (filterValue === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterValue === "not-completed") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    return filteredTasks;
}

function sortTasks(filteredTasks, sortValue) {
    if (sortValue === "high-to-low") {
        filteredTasks.sort((a, b) => priorityValues[b.priority] - priorityValues[a.priority]);
    } else if (sortValue === "low-to-high") {
        filteredTasks.sort((a, b) => priorityValues[a.priority] - priorityValues[b.priority]);
    }

    return filteredTasks;
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const filterSelect = document.getElementById('filterSelect');
    const sortOrderRadios = document.getElementsByName('sortOrder');
    const filterValue = filterSelect.value;
    let sortValue = 'high-to-low';

    sortOrderRadios.forEach(radio => {
        if (radio.checked) {
            sortValue = radio.value;
        }
    });

    taskList.innerHTML = '';

    let filteredTasks = filterTasks(tasks, filterValue);

    filteredTasks = sortTasks(filteredTasks, sortValue);

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.classList.add(task.priority);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTaskCompletion(task.id);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.ondblclick = () => editTaskText(task.id, taskText);

        if (task.completed) {
            taskText.classList.add('completed-task');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => removeTask(task.id);

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(deleteButton);

        taskList.appendChild(taskDiv);
    });
}



function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
    saveTasks();
}

function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    saveTasks();
}

function editTaskText(taskId, taskTextElement) {
    const task = tasks.find(t => t.id === taskId);
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = task.text;
    
    taskTextElement.replaceWith(inputElement);
    inputElement.focus();
    
    inputElement.addEventListener('blur', () => {
        task.text = inputElement.value;
        renderTasks();
    });
    
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            task.text = inputElement.value;
            renderTasks();
        }
    });
    saveTasks();
}

loadTasks();

renderTasks();