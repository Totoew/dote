
/*document.addEventListener('DOMContentLoaded', function () {
    // Получаем текущую задачу из localStorage
    const currentTaskData = localStorage.getItem('currentTask');
    if (!currentTaskData) {
        console.error("Не удалось загрузить текущую задачу.");
        alert("Ошибка: текущая задача не найдена.");
        return;
    }

    const currentTask = JSON.parse(currentTaskData);

    // Заполняем поля формы данными задачи
    const form = document.getElementById('darkTaskForm');
    form.querySelector('[name="name-task"]').value = currentTask.task_name || '';
    form.querySelector('[name="desc-task"]').value = currentTask.task_description || '';
    form.querySelector('[name="type-task"]').value = currentTask.task_type || 'task';
    form.querySelector('[name="priority-level"]').value = currentTask.task_priority || '';
    form.querySelector('[name="day-task"]').value = currentTask.task_date || '';
    form.querySelector('[name="time-notification"]').value = currentTask.task_notification_time || 1;

    // Добавляем теги в контейнер
    /*const tagsContainer = document.getElementById('output');
    if (currentTask.task_tags && currentTask.task_tags.length > 0) {
        currentTask.task_tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'word-block';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }*/
/*});

// Функция для преобразования тегов в массив
/*function getTagsAsArray() {
    const tagsContainer = document.getElementById('output');
    if (!tagsContainer) {
        console.error('Контейнер для тегов не найден');
        return [];
    }

    const tags = [];
    tagsContainer.querySelectorAll('.word-block').forEach(tagElement => {
        tags.push(tagElement.textContent.trim());
    });

    return tags;
}*/

// Сохранение изменений в localStorage
/*document.getElementById('darkTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault();

    const form = evt.target;
    const currentTaskKey = 'currentTask';

    // Собираем данные из формы
    const updatedTask = {
        task_id: JSON.parse(localStorage.getItem(currentTaskKey)).task_id, // Сохраняем старый task_id
        task_name: form.querySelector('[name="name-task"]').value,
        task_description: form.querySelector('[name="desc-task"]').value,
        task_type: form.querySelector('[name="type-task"]').value,
        task_tags: [] /*getTagsAsArray(),*/
      /*  task_priority: form.querySelector('[name="priority-level"]').value,
        task_date: form.querySelector('[name="day-task"]').value,
        task_notification_time: Number(form.querySelector('[name="time-notification"]').value),
        task_status: "pending",
    };

    // Обновляем задачу в localStorage
    localStorage.setItem(currentTaskKey, JSON.stringify(updatedTask));
    console.log("Обновлённая задача сохранена в localStorage:", updatedTask);

    window.location.href = 'index.html'; // Возвращаемся на главную страницу или список задач
});*/

document.addEventListener('DOMContentLoaded', function () {
    // Получаем текущую задачу из localStorage
    const currentTaskData = localStorage.getItem('currentTask');
    if (!currentTaskData) {
        console.error("Не удалось загрузить текущую задачу.");
        alert("Ошибка: текущая задача не найдена.");
        return;
    }

    const currentTask = JSON.parse(currentTaskData);

    // Заполняем поля формы данными задачи
    const form = document.getElementById('darkTaskForm');
    form.querySelector('[name="name-task"]').value = currentTask.task_name || '';
    form.querySelector('[name="desc-task"]').value = currentTask.task_description || '';
    form.querySelector('[name="type-task"]').value = currentTask.task_type || 'task';
    form.querySelector('[name="priority-level"]').value = currentTask.task_priority || '';
    form.querySelector('[name="day-task"]').value = currentTask.task_date || '';
    form.querySelector('[name="time-notification"]').value = currentTask.task_notification_time || 1;
});

// Обработчик формы
document.getElementById('darkTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); // Останавливаем стандартное поведение формы

    const form = evt.target; // Получаем форму
    const currentTaskKey = 'currentTask';

    // Получаем текущую задачу из localStorage
    const currentTask = JSON.parse(localStorage.getItem(currentTaskKey));
    if (!currentTask) {
        console.error("Не найдена текущая задача для обновления.");
        alert("Ошибка: текущая задача не найдена.");
        return;
    }

    // Обновляем данные задачи
    const updatedTask = {
        task_id: currentTask.task_id, // Сохраняем старый task_id
        task_name: form.querySelector('[name="name-task"]').value.trim(),
        task_description: form.querySelector('[name="desc-task"]').value.trim(),
        task_type: form.querySelector('[name="type-task"]').value,
        task_tags: [], // Оставляем старые теги (если они используются)
        task_priority: form.querySelector('[name="priority-level"]').value.trim(),
        task_date: form.querySelector('[name="day-task"]').value.trim(),
        task_notification_time: Number(form.querySelector('[name="time-notification"]').value),
        task_status: "pending", // Статус остается неизменным
    };

    // Сохраняем обновленные данные в localStorage
    localStorage.setItem(currentTaskKey, JSON.stringify(updatedTask));
    console.log("Задача успешно обновлена:", updatedTask);

    // Переход на главную страницу или другую нужную страницу
    window.location.href = 'index.html';
});
