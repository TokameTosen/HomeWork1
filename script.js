document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render all tasks
    function renderTasks() {
        todoList.innerHTML = '';
        doingList.innerHTML = '';
        doneList.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);

            // Правильное распределение по колонкам
            if (task.status === 'To Do') {
                todoList.appendChild(taskElement);
            } else if (task.status === 'Doing') {
                doingList.appendChild(taskElement);
            } else if (task.status === 'Done') {
                doneList.appendChild(taskElement);
            }
        });
    }

    // Create task element
    function createTaskElement(task, index) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.dataset.id = task.id; // Добавляем ID для идентификации

        // Task content with priority
        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';

        const textDiv = document.createElement('div');
        textDiv.className = 'task-text';
        textDiv.textContent = task.text;

        const priorityDiv = document.createElement('div');
        priorityDiv.className = `task-priority priority-${task.priority.toLowerCase()}`;
        priorityDiv.textContent = task.priority;

        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(priorityDiv);

        // Task actions
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        // Status buttons
        const statusDiv = document.createElement('div');

        const todoBtn = document.createElement('button');
        todoBtn.className = 'status-btn todo-btn';
        todoBtn.textContent = 'To Do';
        todoBtn.addEventListener('click', () => updateStatus(task.id, 'To Do'));

        const doingBtn = document.createElement('button');
        doingBtn.className = 'status-btn doing-btn';
        doingBtn.textContent = 'Doing';
        doingBtn.addEventListener('click', () => updateStatus(task.id, 'Doing'));

        const doneBtn = document.createElement('button');
        doneBtn.className = 'status-btn done-btn';
        doneBtn.textContent = 'Done';
        doneBtn.addEventListener('click', () => updateStatus(task.id, 'Done'));

        statusDiv.appendChild(todoBtn);
        statusDiv.appendChild(doingBtn);
        statusDiv.appendChild(doneBtn);

        // Move buttons (работают только в пределах одной колонки)
        const moveDiv = document.createElement('div');

        const upBtn = document.createElement('button');
        upBtn.className = 'move-btn';
        upBtn.innerHTML = '&uarr;';
        upBtn.addEventListener('click', () => moveTask(task.id, -1));

        const downBtn = document.createElement('button');
        downBtn.className = 'move-btn';
        downBtn.innerHTML = '&darr;';
        downBtn.addEventListener('click', () => moveTask(task.id, 1));

        moveDiv.appendChild(upBtn);
        moveDiv.appendChild(downBtn);

        actionsDiv.appendChild(statusDiv);
        actionsDiv.appendChild(moveDiv);

        taskDiv.appendChild(contentDiv);
        taskDiv.appendChild(actionsDiv);

        return taskDiv;
    }

    // Update task status
    function updateStatus(taskId, newStatus) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            saveTasks();
            renderTasks();
        }
    }

    // Move task position (только в пределах одного статуса)
    function moveTask(taskId, direction) {
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;

        // Находим задачи с таким же статусом
        const sameStatusTasks = tasks.filter(t => t.status === tasks[taskIndex].status);
        const sameStatusIndex = sameStatusTasks.findIndex(t => t.id === taskId);

        // Проверяем границы
        if ((direction === -1 && sameStatusIndex === 0) ||
            (direction === 1 && sameStatusIndex === sameStatusTasks.length - 1)) {
            return;
        }

        // Находим индекс задачи для обмена
        const taskToSwap = sameStatusTasks[sameStatusIndex + direction];
        const swapIndex = tasks.findIndex(t => t.id === taskToSwap.id);

        // Меняем местами
        [tasks[taskIndex], tasks[swapIndex]] = [tasks[swapIndex], tasks[taskIndex]];

        saveTasks();
        renderTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Исправлено - удалена лишняя скобка
    }

    // Add new task
    addBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({
                id: Date.now().toString(), // Добавляем уникальный ID
                text: taskText,
                priority: prioritySelect.value,
                status: 'To Do',
                createdAt: new Date().toISOString()
            });
            saveTasks();
            taskInput.value = '';
            renderTasks();
        }
    });

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        removeTask(li);
    });

    li.appendChild(completeCheck);
    li.appendChild(taskTextSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Initial render
    renderTasks();
});