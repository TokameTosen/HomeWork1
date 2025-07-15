export class TaskManager {
    constructor(storage) {
        this.storage = storage;
        this.tasks = this.storage.loadTasks();
    }

    addTask(text, priority) {
        if (text.trim() !== '') {
            this.tasks.push({
                id: Date.now().toString(),
                text: text,
                priority: priority,
                status: 'To Do',
                createdAt: new Date().toISOString()
            });
            this.storage.saveTasks(this.tasks);
        }
    }

    updateStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            this.storage.saveTasks(this.tasks);
        }
    }

    moveTask(taskId, direction) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;

        const sameStatusTasks = this.tasks.filter(t => t.status === this.tasks[taskIndex].status);
        const sameStatusIndex = sameStatusTasks.findIndex(t => t.id === taskId);

        if ((direction === -1 && sameStatusIndex === 0) ||
            (direction === 1 && sameStatusIndex === sameStatusTasks.length - 1)) {
            return;
        }

        const taskToSwap = sameStatusTasks[sameStatusIndex + direction];
        const swapIndex = this.tasks.findIndex(t => t.id === taskToSwap.id);

        [this.tasks[taskIndex], this.tasks[swapIndex]] = [this.tasks[swapIndex], this.tasks[taskIndex]];
        this.storage.saveTasks(this.tasks);
    }

    getTasks() {
        return this.tasks;
    }
}