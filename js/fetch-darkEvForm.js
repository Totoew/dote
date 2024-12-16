//
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

/*
import { get_user_id } from "./get_user_id";

const userId = get_user_id()*/
const eventMOC = {
    event_id: null,
    user_id: 1,
    event_name: "День рождения",
    event_description: "Описание дня рождения",
    event_type: "event",
    event_date: "2024-12-31",
    event_time_first: "09:00",
    event_time_second: "10:00",
    event_notification_time: "30",
    event_status: "pending"
};

function addEventToSchedule(event) {
    const startTime = event.event_time_first.split(":")[0]; // Получаем часы (09)
    const targetBlock = document.querySelector(`.empty-blocks-elem[data-hour="${startTime}"]`);

    if (targetBlock) {
        // Шаблон карточки события
        const template = document.querySelector("#EventCardTemplate");
        if (!template) {
            console.error("Template not found!");
            return;
        }

        const eventCard = template.content.cloneNode(true);
        const eventDiv = eventCard.querySelector(".event-in-calendar");

        // Добавляем текст и стили для карточки
        eventDiv.textContent = event.event_name;
        eventDiv.style.width = "200px";
        eventDiv.style.backgroundColor = "#f0c14b";
        eventDiv.style.padding = "10px";

        // Вставляем карточку в нужный блок
        targetBlock.appendChild(eventCard);
    } else {
        console.error(`Block for hour ${startTime} not found!`);
    }
}

addEventToSchedule(eventMOC);
