const tags = Array.from(document.querySelectorAll('#output .tag')).map(tag => tag.textContent.trim());
let taskMOC = {};

document.getElementById('darkTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;
    const task = {
        task_id:null, 
        'user_id': 965696687, 
        'task_name': form.querySelector('[name="name-task"]').value,
        'task_description': form.querySelector('[name="desc-task"]').value,
        'task_type': form.querySelector('[name="type-task"]').value,
        'task_tags': ["tags"], 
        'task_priority': form.querySelector('[name="priority-level"]').value,
        'task_date': form.querySelector('.day-task').textContent,
        'task_notification_time': Number(form.querySelector('[name="time-notification"]').value),
        'task_status': "pending", 
    };
    const jsonData = JSON.stringify(task);
    getTaskData(jsonData);
});

function getTaskData(jsonData) {
    fetch('https://flask.stk8s.66bit.ru/tasks', {
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
        taskMOC = data;
        console.log('Ответ сервера:', data); 
    })
    .catch(error => {
        console.error('Ошибка:', error); 
    });}

const showData = () => taskMOC;

showData();
