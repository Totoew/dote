const examples = document.querySelectorAll('.example');
const taskContainer = document.querySelector('.tasks');
const currentId = document.querySelector('.current-id');
const dateInput = document.querySelector('.date-input');

let allTasks = [];
let allEvents = [];

async function fetchEvents() {
    try {   
        const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: currentId.value,
                table_name: "events"
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

function transformEvents(eventsArray) {
    return eventsArray.map(event => ({
        event_id: event[0],
        user_id: event[1],
        event_type: event[2],
        event_name: event[3],
        event_description: event[4],
        event_date: event[5],
        event_notification_time: event[6],
        event_status: event[7],
        event_time_first: event[8],
        event_time_second: event[9]
    }));
}

async function fetchTasks() {
    try {   
        const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: currentId.value,
                table_name: "tasks"
            })
        });
            
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            
        const data = await response.json();
        return data.objects || [];
    } catch (error) {
        console.error('Ошибка при получении задач:', error);
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

currentId.addEventListener('change', async () => {
    const tasks = await fetchTasks();
    const transformedTasks = tasks ? transformTasks(tasks) : [];
    allTasks = transformedTasks;

    const events = await fetchEvents();
    const transformedEvents = events ? transformEvents(events) : [];
    allEvents = transformedEvents;

    dateInput.dispatchEvent(new Event('change'));
});

dateInput.addEventListener('change', () => {
    taskContainer.innerHTML = '';
    allTasks.forEach((task) => renderTask(task));
    allEvents.forEach((event) => renderEvent(event));
});

dateInput.dispatchEvent(new Event('change'));

function renderTask(task) {
    if (task.date === dateInput.value) {
        const newTask = examples[0].cloneNode(true);
        newTask.classList.remove('example');
        newTask.classList.remove('hidden');
        newTask.querySelector('.task-name').textContent = task.name;
        newTask.querySelector('.task-time').textContent = task.task_time;
        newTask.querySelector('.check').src = task.status === 'pending' ? '/img/check.png' : '/img/double-check.png';
        taskContainer.appendChild(newTask);
    }
}

function renderEvent(event) {
    if (event.event_date === dateInput.value) {
        const newEvent = examples[1].cloneNode(true);
        newEvent.classList.remove('example');
        newEvent.classList.remove('hidden');
        newEvent.querySelector('.task-name-not-image').textContent = event.event_name;
        newEvent.querySelector('.task-time').textContent = event.event_time_first;
        newEvent.querySelector('.check').src = event.event_status === 'pending' ? '/img/check.png' : '/img/double-check.png';
        taskContainer.appendChild(newEvent);
    }
}