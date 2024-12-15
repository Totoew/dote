// Чтение данных из localStorage
const taskJSON = localStorage.getItem('task');
if (taskJSON) {
    const task = JSON.parse(taskJSON);
    console.log(task); // Вывод задачи в консоль
    fillTaskTemplate(task); // Вызов функции для заполнения шаблона
} else {
    console.error('Данные задачи не найдены в localStorage');
}

// Функция заполнения шаблона
function fillTaskTemplate(task) {
    const template = document.querySelector('#taskCardTemplate');
    if (!template) {
        console.error('Шаблон не найден');
        return;
    }

    const taskCard = template.content.cloneNode(true);

    // Заполняем данные
    taskCard.querySelector('.name-task').textContent = task.task_name;
    const tagsContainer = taskCard.querySelector('.list-tags');
    task.task_tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    taskCard.querySelector('.deadline').textContent = `Дедлайн: ${task.task_date}`;

    // Вставляем в контейнер
    document.querySelector('.tasks-container').appendChild(taskCard);
}

/*}
/*
document.addEventListener('DOMContentLoaded', function () {
    // Получить массив задач из localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const template = document.getElementById('taskCardTemplate');
    const tasksContainer = document.querySelector('.tasks-container');

    // Добавить каждую задачу в контейнер
    tasks.forEach(task => {
        const taskElement = template.content.cloneNode(true);

        // Заполнить шаблон
        taskElement.querySelector('.name-task').textContent = task.name;
        taskElement.querySelector('.day-task').textContent = task.date;
       
        const tagsContainer = taskElement.querySelector('.list-tags');
        if (task.tags && task.tags.length > 0) {
            task.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.classList.add('list-tags-item');
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }

        tasksContainer.appendChild(taskElement);
    });
});
*/