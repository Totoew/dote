/*const tags = Array.from(document.querySelectorAll('#output .tag')).map(tag => tag.textContent.trim());

document.getElementById('darkTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;

    const task = {
        task_id: null, // ID задачи, добавляется на сервере
        user_id: null, // ID пользователя, добавляется на сервере
        task_name: form.querySelector('[name="name-task"]').value,
        task_description: form.querySelector('[name="desc-task"]').value,
        task_type: form.querySelector('[name="type-task"]').value,
        task_tags: tags, 
        task_priority: form.querySelector('[name="priority-level"]').value,
        task_date: form.querySelector('[name="day-task"]').value,
        task_notification_time: form.querySelector('[name="time-notification"]').value,
        task_status: "pending", 
    };

    const jsonData = JSON.stringify(task);

    fetch('https://laert.pythonanywhere.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Ответ сервера:', data); 
        alert('Форма успешно отправлена!');
    })
    .catch(error => {
        console.error('Ошибка:', error); 
        alert('Произошла ошибка при отправке формы.');
    });
});*/

//моковые данные, которые должны прийти 
//с сервера в виде json. Допустим, я их преобазовал в js-объект
const taskMOC = {
    task_id: null,              
    user_id: null,             
    task_name: "Задача 1",      
    task_description: "Описание задачи", 
    task_type: "task",          
    task_tags: ["tag1", "tag2"], 
    task_priority: "normal",   
    task_date: "2024-12-31",  
    task_notification_time: "30",
    task_status: "pending"     
};

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

    // Название задачи
    taskCard.querySelector('.name-task').textContent = task.task_name;

    // Контейнер для тегов и приоритета
    const tagsContainer = taskCard.querySelector('.list-tags');

    // Приоритет
    const priorityElement = document.createElement('span'); // Создаем span для приоритета
    priorityElement.className = 'priority-element'; // Класс для приоритета
    priorityElement.style.fontSize = '12px';
    priorityElement.style.padding = '0 6px';
    priorityElement.style.lineHeight = '20px';
    priorityElement.style.whiteSpace = 'nowrap';
    priorityElement.style.height = '20px';
    priorityElement.style.boxSizing = 'border-box';
    priorityElement.style.borderRadius = '32px';
    priorityElement.style.textAlign = 'center';
    priorityElement.style.marginRight = '0px'; // Отступ от тегов

    switch (task.task_priority) {
        case 'normal':
            priorityElement.textContent = 'Нормально';
            priorityElement.style.backgroundColor = 'green'; // Светло-зеленый фон
            priorityElement.style.color = 'black';
            break;
        case 'not-matter':
            priorityElement.textContent = 'Не важно';
            priorityElement.style.backgroundColor = 'gray'; // Светло-серый фон
            priorityElement.style.color = 'black';
            break;
        case 'matter':
            priorityElement.textContent = 'Важно';
            priorityElement.style.backgroundColor = 'red'; // Светло-красный фон
            priorityElement.style.color = 'black';
            break;
        default:
            priorityElement.textContent = 'Не указано';
            priorityElement.style.backgroundColor = '#d4d4d4'; // Светло-черный фон
            priorityElement.style.color = 'black';
            break;
    }

    // Вставляем приоритет ПЕРЕД тегами
    tagsContainer.prepend(priorityElement);

    // Теги
    task.task_tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'list-tags-item';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    // Дедлайн
    const deadlineElement = taskCard.querySelector('.deadline'); 
    deadlineElement.className = 'margin-deadline';
    deadlineElement.textContent = task.task_date;

    // Добавляем карточку в контейнер задач
    document.querySelector('.tasks-container').appendChild(taskCard);
}