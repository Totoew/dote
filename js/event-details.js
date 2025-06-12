// Функция для форматирования даты
function replaceWithFormattedDate() {
    const input = document.getElementById('dateInput');
    const dateValue = new Date(input.value);

    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    if (!isNaN(dateValue)) {
        const day = dateValue.getDate();
        const monthIndex = dateValue.getMonth();
        const formattedDate = `${day} ${months[monthIndex]}`;

        const span = document.createElement('span');
        span.className = 'date-span';
        span.innerText = formattedDate;

        const container = document.getElementById('dateContainer');
        container.removeChild(input);
        container.appendChild(span);
    }
}

// Валидация времени начала
document.querySelector('.start-event-time').addEventListener('input', function(e) {
    const timeInput = e.target.value;
    const validTimeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    e.target.setCustomValidity(validTimeRegex.test(timeInput) ? '' : 'Время должно быть в формате ЧЧ:MM (например, 14:30)');
});

// Валидация времени окончания
document.querySelector('.finish-event-time').addEventListener('input', function(e) {
    const timeInput = e.target.value;
    const validTimeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    e.target.setCustomValidity(validTimeRegex.test(timeInput) ? '' : 'Время должно быть в формате ЧЧ:MM (например, 14:30)');
});

// Склонение слова "минут"
function updateMinutesLabel(value) {
    const minutesLabel = document.getElementById('minutes-label');
    const numberValue = parseInt(value);
    const lastTwoDigits = numberValue % 100;
    
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13 || lastTwoDigits === 14) {
        minutesLabel.textContent = 'минут';
    } else if (lastTwoDigits % 10 === 1) {
        minutesLabel.textContent = 'минуту';
    } else if (lastTwoDigits % 10 >= 2 && lastTwoDigits % 10 <= 4) {
        minutesLabel.textContent = 'минуты';
    } else {
        minutesLabel.textContent = 'минут';
    }
}

// Загрузка данных для редактирования
document.addEventListener('DOMContentLoaded', function() {
    // Блокировка отправки формы по Enter
    const form = document.getElementById('darkEvForm');
    if (form) {
        form.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    // Заполнение формы данными из localStorage
    const currentEventData = localStorage.getItem('current_event_data');
    if (currentEventData) {
        const event = JSON.parse(currentEventData);
        console.log("ID события: ", event.event_id);
        
        document.querySelector('[name="name-event"]').value = event.event_name || '';
        document.querySelector('[name="desc-event"]').value = event.event_description || '';
        document.querySelector('[name="type-event"]').value = event.event_type || 'event';
        document.querySelector('[name="day-event"]').value = event.event_date || '';
        document.querySelector('[name="start-event-time"]').value = event.event_time_first || '';
        document.querySelector('[name="finish-event-time"]').value = event.event_time_second || '';
        document.querySelector('[name="time-notification"]').value = event.event_notification_time || '';
    } else {
        console.error('Данные текущего события отсутствуют в localStorage.');
    }

    // Обработчик кнопки "Назад"
    document.getElementById('backButton').addEventListener('click', () => {
        window.history.length > 1 ? window.history.back() : window.location.href = 'create-new.html';
    });
});

// Отправка формы
document.getElementById('darkEvForm').addEventListener('submit', async function(evt) {
    evt.preventDefault();

    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('Пользователь не авторизован. Попробуйте позже.');
        return;
    }

    const form = evt.target;
    const startTimeInput = form.querySelector('[name="start-event-time"]');
    const endTimeInput = form.querySelector('[name="finish-event-time"]');

    if (startTimeInput.value === startTimeInput.placeholder || endTimeInput.value === endTimeInput.placeholder) {
        alert('Пожалуйста, выберите время вручную!');
        return;
    }

    const eventData = {
        user_id: userId,
        event_name: form.querySelector('[name="name-event"]').value.trim(),
        event_description: form.querySelector('[name="desc-event"]').value.trim(),
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value,
        event_time_first: startTimeInput.value,
        event_time_second: endTimeInput.value,
        event_notification_time: form.querySelector('[name="time-notification"]').value,
        event_status: "pending",
    };

    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        
        const data = await response.json();
        console.log('Успех:', data);
        alert('Данные отправлены!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка отправки: ' + error.message);
    }
});

// Блокировка свайпа вниз
document.addEventListener('touchmove', function(event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
