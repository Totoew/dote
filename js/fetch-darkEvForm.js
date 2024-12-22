/*
const eventMOC = {
    event_id: null,
    user_id: 965696687,
    event_name: "День рождения",
    event_description: "Описание дня рождения",
    event_type: "event",
    event_date: "2024-12-31",
    event_time_first: "21:00",
    event_time_second: "23:00",
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

addEventToSchedule(eventMOC);*/


/*******
async function get_user_id() {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null; // Вернуть null, если возникла ошибка
    }
}

// Получаем user_id при загрузке страницы
let userId = null;
get_user_id().then(id => {
    if (id) {
        userId = id;
        console.log('Получен user_id:', userId);
    } else {
        alert('Не удалось получить user_id. Попробуйте позже.');
    }
});

document.getElementById('darkEvForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    if (!userId) {
        alert('Пользователь не авторизован. Попробуйте позже.');
        return;
    }

    const form = evt.target;

    const event = {
        user_id: userId, 
        event_name: form.querySelector('[name="name-event"]').value.trim(),
        event_description: form.querySelector('[name="desc-event"]').value.trim(),
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value,
        event_time_first: form.querySelector('[name="start-event-time"]').value,
        event_time_second: form.querySelector('[name="finish-event-time"]').value,
        event_notification_time: form.querySelector('[name="time-notification"]').value,
        event_status: "pending", 
    };

    if (!event.event_name || !event.event_date || !event.event_time_first || !event.event_time_second) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    const jsonData = JSON.stringify(event);

    try {
        const response = await fetch('https://laert.pythonanywhere.com/events', {
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
        alert('Форма успешно отправлена!');
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы.');
    }
});*/







async function fetchUserId() {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null; // Вернуть null, если возникла ошибка
    }
}

// Получаем user_id и сохраняем в localStorage
fetchUserId().then(userId => {
    if (userId) {
        localStorage.setItem('user_id', userId);
        console.log('user_id сохранен в localStorage:', userId);
    } else {
        alert('Не удалось получить user_id. Попробуйте позже.');
    }
});

// Обработчик формы
document.getElementById('darkEvForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('Пользователь не авторизован. Попробуйте позже.');
        return;
    }

    const form = evt.target;

    const event = {
        user_id: userId,
        event_name: form.querySelector('[name="name-event"]').value.trim(),
        event_description: form.querySelector('[name="desc-event"]').value.trim(),
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value,
        event_time_first: form.querySelector('[name="start-event-time"]').value,
        event_time_second: form.querySelector('[name="finish-event-time"]').value,
        event_notification_time: form.querySelector('[name="time-notification"]').value,
        event_status: "pending", // Статус по умолчанию
    };

    // Сохраняем данные события в localStorage
    localStorage.setItem('event_data', JSON.stringify(event));
    console.log('Данные события сохранены в localStorage:', event);
    window.location.href = 'shedule.html';
});




