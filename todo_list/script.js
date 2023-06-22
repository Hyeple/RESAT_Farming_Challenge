let taskStack = [];

function addTask() {
    const taskInput = document.getElementById('todoInput');
    const prioritySelect = document.getElementById('prioritySelect');

    if(taskInput.value == '') {
        alert("할 일을 작성해주세요!");
    }
    
    const task = {
        id: Date.now(),
        text: taskInput.value,
        priority: prioritySelect.value,
        completed: false,
    };

    taskStack.push(task);
    console.log("추가된 task : %s", task.text);
    taskInput.value = '';
}