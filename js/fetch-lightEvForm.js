/*
document.getElementById('lightEvForm').addEventListener('submit', function (evt) {
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
});
*/


document.getElementById('lightEvForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;

    const event = {
        event_id: null, // ID события, добавляется на сервере
        user_id: null, // ID пользователя, добавляется на сервере
        event_name: form.querySelector('[name="name-event"]').value,
        event_description: form.querySelector('[name="desc-event"]').value,
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value,
        event_time_first: form.querySelector('[name="start-event-time"]').value,
        event_time_second: form.querySelector('[name="finish-event-time"]').value,
        event_notification_time: form.querySelector('[name="time-notification"]').value,
        event_status: "pending", 
    };

    const jsonData = JSON.stringify(event);

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