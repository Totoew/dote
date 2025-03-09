/*
document.addEventListener('DOMContentLoaded', function () {
    // Получаем текущую задачу из localStorage
    const currentTaskData = localStorage.getItem('current_event_data');
    if (!currentTaskData) {
        console.error("Не удалось загрузить текущую задачу.");
        alert("Ошибка: текущая задача не найдена.");
        return;
    }

    const currentTask = JSON.parse(currentTaskData);

    // Заполняем поля формы данными задачи
    const form = document.getElementById('darkEvForm');
    form.querySelector('[name="name-event"]').value = currentTask.event_name || '';
    form.querySelector('[name="desc-event"]').value = currentTask.event_description || '';
    form.querySelector('[name="type-event"]').value = currentTask.task_event || 'event';
    form.querySelector('[name="day-event"]').value = currentTask.event_date || '';
    form.querySelector('[name="time-notification"]').value = currentTask.event_notification_time || 1;
    form.querySelector('[name="start-event-time"]').value = currentTask.event_time_first,
    form.querySelector('[name="finish-event-time"]').value = currentTask.event_time_second
});

// Обработчик формы
document.getElementById('darkEvForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); // Останавливаем стандартное поведение формы

    const form = evt.target; // Получаем форму
    const currentTaskKey = 'current_event_data';

    // Получаем текущую задачу из localStorage
    const currentTask = JSON.parse(localStorage.getItem(currentTaskKey));
    if (!currentTask) {
        console.error("Не найдена текущая задача для обновления.");
        alert("Ошибка: текущая задача не найдена.");
        return;
    }

    // Обновляем данные задачи
    const updatedTask = {
        event_id: currentTask.event_id, // Сохраняем старый task_id
        event_name: form.querySelector('[name="name-event"]').value.trim(),
        event_description: form.querySelector('[name="desc-event"]').value.trim(),
        event_type: form.querySelector('[name="type-event"]').value,
        event_date: form.querySelector('[name="day-event"]').value.trim(),
        event_notification_time: Number(form.querySelector('[name="time-notification"]').value),
        event_status: "pending", // Статус остается неизменным
        event_time_first: form.querySelector('[name="start-event-time"]').value,
        event_time_second: form.querySelector('[name="finish-event-time"]').value
    };

    // Сохраняем обновленные данные в localStorage
    localStorage.setItem(currentTaskKey, JSON.stringify(updatedTask));
    console.log("Задача успешно обновлена:", updatedTask);
});*/

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

    window.location.href = 'shedule.html'; // Переход на нужную страницу после сохранения
});

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
      event.preventDefault();
    }
  }, { passive: false });
  
/*
document.getElementById('darkEvForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert('Пользователь не авторизован. Попробуйте позже.');
        return;
    }

    const form = evt.target;

    const eventId = form.querySelector('[name="event-id"]').value.trim(); // Используем event_id из формы
    if (!eventId) {
        console.error('Event ID is missing');
        return;
    }

    // Получаем данные события из localStorage по event_id
    const storedEventData = localStorage.getItem(`event_${eventId}`);
    if (!storedEventData) {
        console.error('No event found with the provided ID.');
        return;
    }

    const event = {
        ...JSON.parse(storedEventData), // Расширяем данные, чтобы не перезаписать все, что нужно
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
});*/
