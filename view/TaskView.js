class TaskView {
    constructor() {
        this.tasksContainer = document.querySelector('.tasks-container');
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-btn');
        this.deleteWindow = document.getElementById('delete-window-id');
        this.confirmDeleteButton = document.querySelector('.confirm-true');
        this.cancelDeleteButton = document.querySelector('.confirm-false');
    }

    // Отрисовать список задач
    renderTasks(tasks) {
        this.tasksContainer.innerHTML = '';
        tasks.forEach(task => this.renderTask(task));
    }

    // Отрисовать одну задачу
    renderTask(task) {
        const template = document.querySelector('#taskCardTemplate');
        const taskCard = template.content.cloneNode(true);

      // Заполняем данными (аналогично твоему fillTaskTemplate)
        taskCard.querySelector('.name-task').textContent = task.task_name || 'No name';
      // ... остальной код заполнения карточки ...

        this.tasksContainer.appendChild(taskCard);
    }

    // Показать/скрыть окно подтверждения удаления
    toggleDeleteWindow(show, taskId = null) {
        this.deleteWindow.classList.toggle('hidden', !show);
        if (taskId) this.deleteWindow.dataset.taskId = taskId;
    }

    // Подписка на события
    bindSearchTasks(handler) {
        this.searchInput.addEventListener('input', (e) => handler(e.target.value));
    }

    bindDeleteTask(handler) {
        this.confirmDeleteButton.addEventListener('click', () => {
        const taskId = this.deleteWindow.dataset.taskId;
        handler(taskId);
        this.toggleDeleteWindow(false);
        });
    }
}