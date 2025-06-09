document.getElementById('darkEvForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); // Останавливаем стандартное поведение формы

    const form = evt.target; // Получаем форму
    const eventId = form.querySelector('[name="event-id"]').value.trim(); // Используем event_id из формы
    if (!eventId) {
        console.error('Event ID is missing');
        return;
    }

    const updatedTask = {
        event_id: eventId, // Сохраняем старый event_id
        event_name: form.querySelector('[name="name-event"]').value.trim(),
        event_description: form.querySelector('[name="desc-event"]').value.trim(),
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value.trim(),
        event_notification_time: Number(form.querySelector('[name="time-notification"]').value),
        event_status: "pending", // Статус остается неизменным
        event_time_first: form.querySelector('[name="start-event-time"]').value,
        event_time_second: form.querySelector('[name="finish-event-time"]').value
    };

    localStorage.setItem(`event_${eventId}`, JSON.stringify(updatedTask));
    console.log("Обновленные данные:", updatedTask);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const user_id = Number(params.get('id'));
    window.location.href = `shedule.html?id=${user_id}`; // Переход на нужную страницу после сохранения
});

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
