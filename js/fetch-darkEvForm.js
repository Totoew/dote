async function fetchUserId() {
    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/get_user_id', {
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

///убрать
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
    const eventId = Date.now();

    const startTimeInput = form.querySelector('[name="start-event-time"]');
    const endTimeInput = form.querySelector('[name="finish-event-time"]');

    // Проверяем, что время было выбрано явно (значение отличается от плейсхолдера)
    if (startTimeInput.value === startTimeInput.placeholder || 
        endTimeInput.value === endTimeInput.placeholder) {
        alert('Пожалуйста, выберите время вручную!');
        return;
    }

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

    const jsonData = JSON.stringify(event);
    await getTaskData(jsonData);

    // Сохраняем данные события в localStorage
    localStorage.setItem(`event_${eventId}`, JSON.stringify(event));
    console.log('Данные события сохранены в localStorage:', event);
    window.location.href = 'shedule.html';
});

// Функция для отправки данных
async function getTaskData(jsonData) {
    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/events', {
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
    } catch (error) {
        console.error('Ошибка при отправке задачи:', error);
        alert('Произошла ошибка при отправке формы.');
    }
}

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
