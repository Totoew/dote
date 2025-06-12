const template = document.getElementById('taskCardTemplate');
const container = document.querySelector('.container');
let TASK_DATA = [];

function fetchUserId() {
    try {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const user_id = Number(params.get('id'));
        localStorage.setItem('user_id', user_id);
            
        return user_id;
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

async function fetchEvents() {
    try {
    const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('user_id'),// Ваш user_id 965696687
            table_name: "tasks"   
        })
    });

    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.objects || [];
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

function transformEvents(tasksArray) {
    return tasksArray.map(task => ({
        id: task[0],
        user_id: task[1],
        type: task[2],
        name: task[3],
        description: task[4],
        list_tags: task[5],
        date: task[6],
        task_time: task[10],
        status: task[8],
        task_priority: task[9],
        notification_time: task[7],
    }));
}

loadAndRenderTasks();

async function deleteTaskById(taskId) {
    try {
        const userId = localStorage.getItem('user_id'); 
        const response = await fetch('https://flask.stk8s.66bit.ru/delete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: parseInt(userId),
                id: taskId,
                type: 'task',
            }),
        });
        if (response.status === 200) {
            const result = await response.json();
            console.log('Успех:', result.message);
            return true;
        } else if (response.status === 400) {
            const error = await response.json();
            console.error('Ошибка:', error.message);
            return false;
        } else {
            console.error('Неожиданный статус:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Сетевая ошибка:', error);
        return false;
    }
}

function renderTasks(tasks) {
    if (!container) {
        console.error('Контейнер для задач не найден!');
        return;
    }

    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = '<p>Нет задач для отображения</p>';
        return;
    }

    tasks.forEach(task => {
        const templateContent = template.content.cloneNode(true);
        const taskElement = templateContent.querySelector('.task-card');

        // Название задачи
        const nameElement = templateContent.querySelector('.name-task');
        nameElement.textContent = task.name || 'Без названия';

        // Приоритет
        const priorityElement = templateContent.querySelector('.priorit');
        const priorityContainer = templateContent.querySelector('.list-tags');

        priorityElement.classList.remove('priority-normal', 'priority-matter', 'priority-important', 'priority-default');

        switch (task.task_priority) {
            case 'normal':
                priorityElement.textContent = 'нормально';
                priorityElement.classList.add('priority-normal');
                break;
            case 'matter':
                priorityElement.textContent = 'важно';
                priorityElement.classList.add('priority-important');
                break;
            case 'not-matter':
                priorityElement.textContent = 'не важно';
                priorityElement.classList.add('priority-matter');
                break;
            default:
                priorityElement.textContent = task.task_priority || 'нет';
                priorityElement.classList.add('priority-default');
        }

        // Теги
        const tagContainer = templateContent.querySelector('.tag-container');
        tagContainer.innerHTML = ''; 

        const tags = (task.list_tags || '')
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        tags.forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.textContent = tag;
            tagEl.classList.add('list-tags-item');
            tagContainer.appendChild(tagEl);
        });

        const deadlineElement = templateContent.querySelector('.deadline');
        deadlineElement.textContent = formatTaskDate(task.date, task.task_time);

        // Обработка удаления
        const deleteButton = templateContent.querySelector('.icon-button');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const taskId = task.id;

            const deleteWindow = document.getElementById('delete-window');
            if (deleteWindow) {
                deleteWindow.classList.remove('hidden');

                const confirmTrueButton = deleteWindow.querySelector('.confirm-true');
                const confirmFalseButton = deleteWindow.querySelector('.confirm-false');

                confirmTrueButton.onclick = null;
                confirmFalseButton.onclick = null;

                confirmTrueButton.onclick = () => {
                    deleteTaskById(taskId)
                        .then(success => {
                            if (success) {
                                console.log(`Задача с ID ${taskId} успешно удалена.`);
                                loadAndRenderTasks();
                            } else {
                                console.error(`Не удалось удалить задачу с ID ${taskId}.`);
                                alert("Не удалось удалить задачу.");
                            }
                        });
                    deleteWindow.classList.add('hidden');
                };

                confirmFalseButton.onclick = () => {
                    deleteWindow.classList.add('hidden');
                };

                document.addEventListener('mousedown', (event) => {
                    if (deleteWindow && !deleteWindow.classList.contains('hidden')) {
                        if (!deleteWindow.contains(event.target)) {
                            deleteWindow.classList.add('hidden');
                        }
                    }
                });
            }
        });

        // Переход к деталям задачи
        taskElement.addEventListener('click', () => {
            localStorage.setItem('current_task_data', JSON.stringify(task));
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const user_id = Number(params.get('id'));
            window.location.href = `task-details.html?id=${user_id}`;
        });

        container.appendChild(templateContent);
    });
}

// Вспомогательная функция для форматирования даты и времени
function formatTaskDate(dateString, timeString) {
    if (!dateString && !timeString) return 'Нет срока';
    
    const date = dateString ? new Date(dateString) : null;
    const time = timeString ? timeString : null;
    
    let result = '';
    
    if (date) {
        result += `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    }
    
    if (time) {
        if (date) result += ' ';
        result += time;
    }
    
    return result || 'Нет срока';
}

async function loadAndRenderTasks() {
    try {
        const userId = fetchUserId();
        if (!userId) {
            throw new Error('Не удалось получить user_id');
        }
        localStorage.setItem('user_id', userId);

        const rawTasks = await fetchEvents(); 
        TASK_DATA = transformEvents(rawTasks); 
        renderTasks(TASK_DATA);
    } catch (error) {
        console.error('Ошибка загрузки задач:', error);
        alert('Не удалось загрузить задачи');
    }
}

const search = window.location.search;
const links = document.querySelectorAll('.nav-item a');

const createLink = document.querySelector('.a-none-decorat');
const href = createLink.getAttribute('href');
if (href && href !== '') {
    const separator = href.includes('?') ? '&' : '?';
    createLink.setAttribute('href', href + (search ? separator + search.slice(1) : ''));
    console.log(createLink.getAttribute('href'));
}

links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '') {
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', href + (search ? separator + search.slice(1) : ''));
        console.log(link.getAttribute('href'));
    }
});

window.refreshTasks = loadAndRenderTasks;

document.addEventListener('DOMContentLoaded', loadAndRenderTasks);
