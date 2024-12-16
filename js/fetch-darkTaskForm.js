//моздаем функцию для генерации айдишника
async function get_user_id() {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

const tags = Array.from(document.querySelectorAll('#output .tag')).map(tag => tag.textContent.trim());
let taskMOC = {};

document.getElementById('darkTaskForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    const userId = await get_user_id();
    console.log("вот наш юзер-ид:  ", userId);

    // Проверка: если userId не получен
    if (!userId) {
        console.error("Не удалось получить user_id.");
        alert("Ошибка: не удалось получить идентификатор пользователя.");
        return;
    }

    const form = evt.target;

    const task = {
        'task_id': null,
        'user_id': userId, 
        'task_name': form.querySelector('[name="name-task"]').value,
        'task_description': form.querySelector('[name="desc-task"]').value,
        'task_type': form.querySelector('[name="type-task"]').value,
        'task_tags': ['Квас', "Компот", "кола"],
        'task_priority': form.querySelector('[name="priority-level"]').value,
        'task_date': form.querySelector('[name="day-task"]').value,
        'task_notification_time': Number(form.querySelector('[name="time-notification"]').value),
        'task_status': "pending",
    };

    console.log("Отправляем задачу:", task);

    const jsonData = JSON.stringify(task);
    await getTaskData(jsonData);
});

async function getTaskData(jsonData) {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Ответ сервера:', data);

        // Логируем данные для сохранения в Local Storage
        if (data && data.task) {
            console.log('Данные task для сохранения:', data.task);
            localStorage.setItem('serverResponse', JSON.stringify(data.task));
        } else {
            console.error('Отсутствуют данные task для сохранения');
        }

        alert('Форма успешно отправлена!');
    } catch (error) {
        console.error('Ошибка при отправке задачи:', error);
        alert('Произошла ошибка при отправке формы.');
    }
}
/*
async function getTaskData(jsonData) {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Ответ сервера:', data);

        // Сохраняем ответ сервера в Local Storage
        localStorage.setItem('serverResponse', JSON.stringify(data));

        alert('Форма успешно отправлена!');
    } catch (error) {
        console.error('Ошибка при отправке задачи:', error);
        alert('Произошла ошибка при отправке формы.');
    }
}
*/
/****************************************************************************************************** */


//моковые данные, которые должны прийти 
//с сервера в виде json. Допустим, я их преобазовал в js-объект
/*taskMOC = {
    task_id: null,              
    user_id: 965696687,             
    task_name: "Задача 1",      
    task_description: "Описание задачи", 
    task_type: "task",          
    task_tags: ["tag1ghcgfhgff", "tag2"], 
    task_priority: "matter",   
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
                    // Сохраняем ID в localStorage
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