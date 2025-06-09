const currentId = document.querySelector('.current-id');
const dateInput = document.querySelector('.date-input');
const container = document.querySelector('.tasks');
const template = document.querySelector('.example');
let EVENT_DATA = null;

async function filterAndRenderTasks() {
    try {
        if (EVENT_DATA === null) {
            const rawEvents = await fetchTasks();
            EVENT_DATA = transformTasks(rawEvents);
        }
        
        const filteredEvents = EVENT_DATA.filter(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateInput.value;
        });   
        renderTasks(filteredEvents);
    } catch (error) {
        console.error('Ошибка загрузки событий:', error);
    }
}

async function fetchTasks() {
    try {
        const userId = currentId.value;
            
        const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                table_name: "tasks"
            })
        });
            
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            
        const data = await response.json();
        return data.objects || [];
    } catch (error) {
        console.error('Ошибка при получении событий:', error);
        return [];
    }
}

function transformTasks(tasksArray) {
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



// Функция отрисовки задач
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
        const newTask = template.cloneNode(true);
        const taskName = newTask.querySelector('.task-name');
        taskName.textContent = task.name;
        const priority = newTask.querySelector('.priority');
        const priorityText = priority.querySelector('.priority-text');

        switch(task.task_priority) {
            case 'normal':
                priority.style.backgroundColor = '#78BA6F';
                priorityText.textContent = 'Нормально';
                break;
            case 'matter':
                priority.style.backgroundColor = '#FF0000';
                priorityText.textContent = 'Важно';
                break;
            case 'not-matter':
                priority.style.backgroundColor = '#818181';
                priorityText.textContent = 'Не важно';
                break;
        }

        const taskTime = newTask.querySelector('.task-time');
        taskTime.textContent = task.task_time;

        const tags = newTask.querySelector('.tags');
            if (task.list_tags) {
                let taskTags = task.list_tags.split(',');
                taskTags = taskTags.length > 2 ? taskTags.slice(0, 2) : taskTags;
                taskTags.forEach((taskTag) => {
                    const tag = document.createElement('p');
                    tag.classList.add('tag');
                    tag.textContent = taskTag;
                    tags.appendChild(tag);
                });
        }

        priority.classList.remove('example');
        priority.classList.remove('hidden');

        container.appendChild(newTask);
    });
}





// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    await filterAndRenderTasks();
    
    // Блокировка свайпа
    document.addEventListener('touchmove', (e) => {
        if (e.touches?.[0]?.clientY > 0) {
            e.preventDefault();
        }
    }, { passive: false });

    // Разрешение скролла в контейнере
    const scrollBox = document.querySelector('.list-tasks');
    if (scrollBox) {
        scrollBox.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }
});

dateInput.addEventListener('change', async () => await filterAndRenderTasks());
currentId.addEventListener('change', async () => {
    EVENT_DATA = null;
    await filterAndRenderTasks();
});

//функция для отображения приоритетов
document.getElementById('inputFieldPriority').addEventListener('change', function () {
    const select = this;

    select.classList.remove('not-matter', 'normal', 'matter');

    if (select.value === 'not-matter') {
        select.classList.add('not-matter');
    } else if (select.value === 'normal') {
        select.classList.add('normal');
    } else if (select.value === 'matter') {
        select.classList.add('matter');
    }
});

document.getElementById("inputFieldPriority").addEventListener("change", function () {
    if (this.value !== "") {
        // Если выбрана любая другая опция, кроме "Выберите..."
        this.querySelectorAll("option")[0].style.display = "none"; 
    } else {
        this.options[0].style.display = ""; 
    }
});