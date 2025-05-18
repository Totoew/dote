class TaskModel {
    // Получить все задачи из LocalStorage
    getAllTasks() {
        const taskKeys = Object.keys(localStorage);
        return taskKeys.map(key => JSON.parse(localStorage.getItem(key))).filter(task => task !== null);
    }

    // Удалить задачу по ID
    deleteTask(taskId) {
        const taskKeys = Object.keys(localStorage);
        taskKeys.forEach(key => {
        const task = JSON.parse(localStorage.getItem(key));
        if (task && task.task_id === taskId) {
            localStorage.removeItem(key);
        }
        });
    }
    }