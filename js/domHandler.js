export class DomHandler {
    constructor(taskManager, taskRenderer) {
        this.taskManager = taskManager;
        this.taskRenderer = taskRenderer;
        this.taskInput = document.getElementById('task-input');
        this.prioritySelect = document.getElementById('priority-select');
        this.addBtn = document.getElementById('add-btn');
    }

    init() {
        this.addBtn.addEventListener('click', () => this.handleAddTask());
        // You can add more event listeners here
        this.renderTasks();
    }

    handleAddTask() {
        this.taskManager.addTask(this.taskInput.value, this.prioritySelect.value);
        this.taskInput.value = '';
        this.renderTasks();
    }

    renderTasks() {
        this.taskRenderer.render(this.taskManager.getTasks());
    }
}