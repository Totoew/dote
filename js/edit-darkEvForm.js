document.getElementById('darkEvForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); // Предотвращаем отправку формы по умолчанию
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('Пользователь не авторизован. Попробуйте позже.');
        return;
    }

    const form = evt.target;

    const eventId = form.querySelector('[name="event-id"]').value; // Получаем event_id из формы или используем ранее сохраненный
    if (!eventId) {
        console.error('Event ID is missing');
        return;
    }

    const event = {
        event_id: eventId,
        user_id: userId,
        event_name: form.querySelector('[name="name-event"]').value.trim(),
        event_description: form.querySelector('[name="desc-event"]').value.trim(),
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value,
        event_time_first: form.querySelector('[name="start-event-time"]').value,
        event_time_second: form.querySelector('[name="finish-event-time"]').value,
        event_notification_time: form.querySelector('[name="time-notification"]').value,
        event_status: form.querySelector('[name="event-status"]').value || "pending", // Статус может быть обновлен из формы
    };

    // Обновляем данные события в localStorage
    localStorage.setItem(`event_${event.event_id}`, JSON.stringify(event));
    console.log('Данные события обновлены в localStorage:', event);

    window.location.href = 'shedule.html'; // Перенаправляем на расписание после сохранения
});