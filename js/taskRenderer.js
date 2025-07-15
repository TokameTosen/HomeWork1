export class TaskRenderer {
    constructor(todoList, doingList, doneList) {
        this.todoList = todoList;
        this.doingList = doingList;
        this.doneList = doneList;
    }

    render(tasks) {
        this.clearLists();
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.appendToCorrectList(taskElement, task.status);
        });
    }

    clearLists() {
        this.todoList.innerHTML = '';
        this.doingList.innerHTML = '';
        this.doneList.innerHTML = '';
    }

    createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.dataset.id = task.id;

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

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const statusDiv = document.createElement('div');

        const todoBtn = document.createElement('button');
        todoBtn.className = 'status-btn todo-btn';
        todoBtn.textContent = 'To Do';

        const doingBtn = document.createElement('button');
        doingBtn.className = 'status-btn inprogress-btn';
        doingBtn.textContent = 'In Progress';

        const doneBtn = document.createElement('button');
        doneBtn.className = 'status-btn done-btn';
        doneBtn.textContent = 'Done';

        statusDiv.appendChild(todoBtn);
        statusDiv.appendChild(doingBtn);
        statusDiv.appendChild(doneBtn);

        const moveDiv = document.createElement('div');

        const upBtn = document.createElement('button');
        upBtn.className = 'move-btn';
        upBtn.innerHTML = '&uarr;';

        const downBtn = document.createElement('button');
        downBtn.className = 'move-btn';
        downBtn.innerHTML = '&darr;';

        moveDiv.appendChild(upBtn);
        moveDiv.appendChild(downBtn);

        actionsDiv.appendChild(statusDiv);
        actionsDiv.appendChild(moveDiv);

        taskDiv.appendChild(contentDiv);
        taskDiv.appendChild(actionsDiv);

        return taskDiv;
    }

    appendToCorrectList(taskElement, status) {
        if (status === 'To Do') this.todoList.appendChild(taskElement);
        else if (status === 'In Progress') this.doingList.appendChild(taskElement);
        else if (status === 'Done') this.doneList.appendChild(taskElement);
    }
}