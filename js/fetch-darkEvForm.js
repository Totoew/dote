// Записываем данные с формы событий и отправляем на сервер
// Проверено, работает
function fetchUserId() {
    try {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const user_id = Number(params.get('id'));
            
        localStorage.setItem('user_id', user_id);
        return user_id;
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

fetchUserId();

document.getElementById('darkEvForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    const userId = localStorage.getItem('user_id');
    console.log(userId);
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
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const user_id = Number(params.get('id'));
    window.location.href = `shedule.html?id=${user_id}`;
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Ошибка отправки: ' + error.message);
  });
}
