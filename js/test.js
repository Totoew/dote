// Чтение данных из localStorage
/*const taskJSON = localStorage.getItem('task');
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
}*/

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
/*************************************************** */
/*
const savedResponse = localStorage.getItem('serverResponse');

if (savedResponse) {
    const taskMOC = JSON.parse(savedResponse);
    console.log('Полученные данные из Local Storage:', taskMOC);
    fillTaskTemplate(taskMOC);
} else {
    console.log('Данные из Local Storage отсутствуют.');
}

function fillTaskTemplate(taskMOC) {
    const template = document.querySelector('#taskCardTemplate');
    if (!template) {
        console.error('Шаблон не найден');
        return;
    }

    const taskCard = template.content.cloneNode(true);

    taskCard.querySelector('.name-task').textContent = taskMOC.task_name;

    const tagsContainer = taskCard.querySelector('.list-tags');

    const priorityElement = document.createElement('span');
    priorityElement.className = 'priority-element'; 
    priorityElement.style.fontSize = '12px';
    priorityElement.style.padding = '0 6px';
    priorityElement.style.lineHeight = '20px';
    priorityElement.style.whiteSpace = 'nowrap';
    priorityElement.style.height = '20px';
    priorityElement.style.boxSizing = 'border-box';
    priorityElement.style.borderRadius = '32px';
    priorityElement.style.textAlign = 'center';
    priorityElement.style.marginRight = '0px'; 

    switch (taskMOC.task_priority) {
        case 'normal':
            priorityElement.textContent = 'Нормально';
            priorityElement.style.backgroundColor = 'green'; 
            priorityElement.style.color = 'black';
            break;
        case 'not-matter':
            priorityElement.textContent = 'Не важно';
            priorityElement.style.backgroundColor = 'gray'; 
            priorityElement.style.color = 'black';
            break;
        case 'matter':
            priorityElement.textContent = 'Важно';
            priorityElement.style.backgroundColor = 'red'; 
            priorityElement.style.color = 'black';
            break;
        default:
            priorityElement.textContent = 'Не указано';
            priorityElement.style.backgroundColor = '#d4d4d4'; 
            priorityElement.style.color = 'black';
            break;
    }

    tagsContainer.prepend(priorityElement);
    console.log("Дата: ", typeof  taskMOC.task_date);
    console.log("Массив: ", typeof  taskMOC.task_tags);
    taskMOC.task_tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'list-tags-item';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    const deadlineElement = taskCard.querySelector('.deadline'); 
    deadlineElement.className = 'margin-deadline';
    deadlineElement.textContent = taskMOC.task_date;

    const cardElement = taskCard.querySelector('.main-block');
    cardElement.addEventListener('click', () => {
        // Сохраняем данные задачи в localStorage для передачи между страницами 
        localStorage.setItem('currentTask', JSON.stringify(taskMOC));
        window.location.href = 'task-details.html';
    });

    document.querySelector('.tasks-container').appendChild(taskCard);
}

function addDeleteEventToExistingCards() {
    document.querySelectorAll('.delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const taskCard = event.target.closest('.task-card'); 
            if (taskCard) {
                const taskId = taskCard.getAttribute('data-task-id');
                if (taskId) {
                    let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
                    if (!deletedTasks.includes(taskId)) {
                        deletedTasks.push(taskId);
                        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                    }
                }
                taskCard.remove(); 
            }
        });
    });
}

addDeleteEventToExistingCards();
*/

/************************************************************************* */
//разделили один файл на 2. fetch-darkTaskForm собирает данные с форм
//этот файл принимает по функции showData данные, возвращенные с сервера
//и вставляет их в шаблон
/*
import { showData } from "./fetch-darkTaskForm";

const taskMOC = showData();
console.log("ВЫвод в консоль для проверки: ", taskMOC);

if (taskMOC) {
    console.log(taskMOC); 
    fillTaskTemplate(taskMOC); 
} else {
    console.error('Данные задачи не найдены в localStorage');
}

function fillTaskTemplate(task) {
    const template = document.querySelector('#taskCardTemplate');
    if (!template) {
        console.error('Шаблон не найден');
        return;
    }

    const taskCard = template.content.cloneNode(true);

    taskCard.querySelector('.name-task').textContent = task.task_name;

    const tagsContainer = taskCard.querySelector('.list-tags');

    const priorityElement = document.createElement('span');
    priorityElement.className = 'priority-element'; 
    priorityElement.style.fontSize = '12px';
    priorityElement.style.padding = '0 6px';
    priorityElement.style.lineHeight = '20px';
    priorityElement.style.whiteSpace = 'nowrap';
    priorityElement.style.height = '20px';
    priorityElement.style.boxSizing = 'border-box';
    priorityElement.style.borderRadius = '32px';
    priorityElement.style.textAlign = 'center';
    priorityElement.style.marginRight = '0px'; 

    switch (task.task_priority) {
        case 'normal':
            priorityElement.textContent = 'Нормально';
            priorityElement.style.backgroundColor = 'green'; 
            priorityElement.style.color = 'black';
            break;
        case 'not-matter':
            priorityElement.textContent = 'Не важно';
            priorityElement.style.backgroundColor = 'gray'; 
            priorityElement.style.color = 'black';
            break;
        case 'matter':
            priorityElement.textContent = 'Важно';
            priorityElement.style.backgroundColor = 'red'; 
            priorityElement.style.color = 'black';
            break;
        default:
            priorityElement.textContent = 'Не указано';
            priorityElement.style.backgroundColor = '#d4d4d4'; 
            priorityElement.style.color = 'black';
            break;
    }

    tagsContainer.prepend(priorityElement);

    task.task_tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'list-tags-item';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    const deadlineElement = taskCard.querySelector('.deadline'); 
    deadlineElement.className = 'margin-deadline';
    deadlineElement.textContent = task.task_date;

    const cardElement = taskCard.querySelector('.main-block');
    cardElement.addEventListener('click', () => {
        // Сохраняем данные задачи в localStorage для передачи между страницами 
        localStorage.setItem('currentTask', JSON.stringify(task));
        window.location.href = 'task-details.html';
    });

    document.querySelector('.tasks-container').appendChild(taskCard);
}

function addDeleteEventToExistingCards() {
    document.querySelectorAll('.delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const taskCard = event.target.closest('.task-card'); 
            if (taskCard) {
                const taskId = taskCard.getAttribute('data-task-id');
                if (taskId) {
                    let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
                    if (!deletedTasks.includes(taskId)) {
                        deletedTasks.push(taskId);
                        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                    }
                }
                taskCard.remove(); 
            }
        });
    });
}

addDeleteEventToExistingCards();*/

const savedResponse = localStorage.getItem('serverResponse');

if (savedResponse) {
    const parsedData = JSON.parse(savedResponse);
    console.log('Извлечённые данные из Local Storage:', parsedData);

    // Проверка, что данные содержат нужную структуру
    if (parsedData) {
        fillTaskTemplate(parsedData); // Заполняем шаблон, если данные присутствуют
    } else {
        console.error('Ошибка: в Local Storage нет валидных данных.');
    }
} else {
    console.log('Данные из Local Storage отсутствуют.');
}
/*
const savedResponse = localStorage.getItem('serverResponse');

if (savedResponse) {
    const taskMOC = JSON.parse(savedResponse);
    console.log('Полученные данные из Local Storage:', taskMOC);
    fillTaskTemplate(taskMOC);
} else {
    console.log('Данные из Local Storage отсутствуют.');
}*/

function fillTaskTemplate(taskMOC) {
    const template = document.querySelector('#taskCardTemplate');
    if (!template) {
        console.error('Шаблон не найден');
        return;
    }

    const taskCard = template.content.cloneNode(true);
    console.log("taskcard^ ",taskCard);
    taskCard.querySelector('.name-task').textContent = taskMOC.task_name || 'No task name'; // Default value

    const tagsContainer = taskCard.querySelector('.list-tags');

    // Добавляем проверку на пустоту массива task_tags
    if (taskMOC.task_tags && taskMOC.task_tags.length > 0) {
        taskMOC.task_tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'list-tags-item';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    } else {
        const defaultTagElement = document.createElement('span');
        defaultTagElement.className = 'list-tags-item';
        defaultTagElement.textContent = 'No tags'; // Placeholder if tags are missing
        tagsContainer.appendChild(defaultTagElement);
    }

    const priorityElement = document.createElement('span');
    priorityElement.className = 'priority-element';
    priorityElement.style.fontSize = '12px';
    priorityElement.style.padding = '0 6px';
    priorityElement.style.lineHeight = '20px';
    priorityElement.style.whiteSpace = 'nowrap';
    priorityElement.style.height = '20px';
    priorityElement.style.boxSizing = 'border-box';
    priorityElement.style.borderRadius = '32px';
    priorityElement.style.textAlign = 'center';
    priorityElement.style.marginRight = '0px';

    switch (taskMOC.task_priority) {
        case 'normal':
            priorityElement.textContent = 'Нормально';
            priorityElement.style.backgroundColor = 'green';
            priorityElement.style.color = 'black';
            break;
        case 'not-matter':
            priorityElement.textContent = 'Не важно';
            priorityElement.style.backgroundColor = 'gray';
            priorityElement.style.color = 'black';
            break;
        case 'matter':
            priorityElement.textContent = 'Важно';
            priorityElement.style.backgroundColor = 'red';
            priorityElement.style.color = 'black';
            break;
        default:
            priorityElement.textContent = 'Не указано';
            priorityElement.style.backgroundColor = '#d4d4d4';
            priorityElement.style.color = 'black';
            break;
    }

    tagsContainer.prepend(priorityElement);

    console.log("Дата: ", typeof taskMOC.task_date);
    console.log("Массив: ", typeof taskMOC.task_tags);
    
    // Устанавливаем дату по умолчанию если null
    const deadlineElement = taskCard.querySelector('.deadline');
    deadlineElement.className = 'margin-deadline';
    deadlineElement.textContent = taskMOC.task_date || 'No date'; // Default value

    const cardElement = taskCard.querySelector('.main-block');
    cardElement.addEventListener('click', () => {
        // Сохраняем данные задачи в localStorage для передачи между страницами
        localStorage.setItem('currentTask', JSON.stringify(taskMOC));
        window.location.href = 'task-details.html';
    });

    document.querySelector('.tasks-container').appendChild(taskCard);
}
