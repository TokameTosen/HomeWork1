import { TaskManager } from './taskManager.js';
import { TaskRenderer } from './taskRenderer.js';
import { DomHandler } from './domHandler.js';
import { Storage } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const storage = new Storage();
    const taskManager = new TaskManager(storage);
    const taskRenderer = new TaskRenderer(
        document.getElementById('todo-list'),
        document.getElementById('doing-list'),
        document.getElementById('done-list')
    );

    const domHandler = new DomHandler(taskManager, taskRenderer);
    domHandler.init();
});
