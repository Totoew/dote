/*document.getElementById('darkEvForm').addEventListener('submit', function (evt) {
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
});*/

document.addEventListener('DOMContentLoaded', () => {
    const eventMOC = {
        event_id: null,
        user_id: 965696687,
        event_name: "День рождения",
        event_description: "Описание дня рождения",
        event_type: "event",
        event_date: "2024-12-31",
        event_time_first: "09:00",
        event_time_second: "10:00",
        event_notification_time: "30",
        event_status: "pending"
    };

    if (eventMOC) {
        console.log(eventMOC);
        addEventToSchedule(eventMOC);
    } else {
        console.error('Данные события не найдены');
    }
});

function addEventToSchedule(event) {
    const scheduleContainer = document.querySelector('.empty-blocks');
    const template = document.querySelector('#EventCardTemplate');

    if (!template || !scheduleContainer) {
        console.error('Шаблон или контейнер для событий не найдены');
        return;
    }

    // Создаём карточку из шаблона
    const eventCard = template.content.cloneNode(true);
    const eventItem = eventCard.querySelector('.event-in-calendar');
    eventItem.textContent = event.event_name;

    // Парсинг времени события
    const startTime = parseTime(event.event_time_first);
    const endTime = parseTime(event.event_time_second);

    // Высота одного блока (час) в расписании
    const totalHours = 24; // Количество часов
    const containerHeight = scheduleContainer.offsetHeight; // Высота всей зоны
    const hourHeight = containerHeight / totalHours; // Высота одного часа

    // Рассчитываем позицию и высоту карточки
    const startOffset = startTime.hours * hourHeight + (startTime.minutes / 60) * hourHeight;
    const eventDuration = (endTime.hours - startTime.hours) * hourHeight +
        ((endTime.minutes - startTime.minutes) / 60) * hourHeight;

    // Устанавливаем стили для карточки
    const eventElement = eventCard.querySelector('.empty-blocks-elem');
    eventElement.style.position = 'absolute';
    eventElement.style.top = `${startOffset}px`; // Отступ сверху
    eventElement.style.height = `${eventDuration}px`; // Высота
    eventElement.style.width = '100%'; // Ширина
    eventElement.style.backgroundColor = '#FFC107'; // Цвет фона
    eventElement.style.borderRadius = '8px';
    eventElement.style.padding = '4px';
    eventElement.style.boxSizing = 'border-box';

    // Добавляем карточку в контейнер
    scheduleContainer.appendChild(eventElement);
}

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes };
}

