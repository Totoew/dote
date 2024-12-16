/*
document.getElementById('lightTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;
    const formData = new FormData(form); 

    fetch('https://laert.pythonanywhere.com/', {
        method: 'POST',
        body: formData 
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

userId = get_user_id()

document.getElementById('lightTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;

    const tags = Array.from(document.querySelectorAll('#output .tag')).map(tag => tag.textContent.trim());

    const task = {
        task_id: null, // ID задачи, добавляется на сервере
        user_id: userId,
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
});