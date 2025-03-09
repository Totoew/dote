/*document.getElementById('lightTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;

    const tags = Array.from(document.querySelectorAll('#output .tag')).map(tag => tag.textContent.trim());

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
import { get_user_id } from "./get_user_id";

const userId = get_user_id()

taskMOC = {
    task_id: null,              
    user_id: userId,             
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
        window.location.href = 'light-task-details.html';
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

addDeleteEventToExistingCards();

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
      event.preventDefault();
    }
  }, { passive: false });
  