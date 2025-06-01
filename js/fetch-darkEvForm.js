// Записываем данные с формы событий и отправляем на сервер
// Проверено, работает
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
        return null;
    }
}

fetchUserId().then(userId => {
    if (userId) {
        localStorage.setItem('user_id', userId);
        console.log('user_id сохранен в localStorage:', userId);
    } else {
        alert('Не удалось получить user_id. Попробуйте позже.');
    }
});

document.getElementById('darkEvForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('Пользователь не авторизован. Попробуйте позже.');
        return;
    }

    const form = evt.target;

    const startTimeInput = form.querySelector('[name="start-event-time"]');
    const endTimeInput = form.querySelector('[name="finish-event-time"]');

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
        event_status: "pending",
    };

    getTaskData(event);
});

async function getTaskData(eventData) {
    fetch('https://flask.stk8s.66bit.ru/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(eventData),
})
.then(response => {
  if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
  return response.json();
})
.then(data => {
  console.log('Успех:', data);
  window.location.href = 'shedule.html';
})
.catch(error => {
  console.error('Ошибка:', error);
  alert('Ошибка отправки: ' + error.message);
});
}
