class TaskPresenter {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.tasks = [];
    
        this.init();
    }

    init() {
        this.loadTasks();
        this.setupEventListeners();
    }

    loadTasks() {
        this.tasks = this.model.getAllTasks();
        this.view.renderTasks(this.tasks);
    }

    setupEventListeners() {
        this.view.bindSearchTasks(this.searchTasks.bind(this));
        this.view.bindDeleteTask(this.deleteTask.bind(this));
    }

    searchTasks(query) {
        const filteredTasks = this.tasks.filter(task => 
        task.task_name.toLowerCase().includes(query.toLowerCase())
    );
        this.view.renderTasks(filteredTasks);
    }

    deleteTask(taskId) {
        this.model.deleteTask(taskId);
        this.tasks = this.tasks.filter(task => task.task_id !== taskId);
        this.view.renderTasks(this.tasks);
    }
}