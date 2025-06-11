// // Записываем данные с формы событий и отправляем на сервер
// //Проверено, работает

// function fetchUserId() {
//     try {
//         const search = window.location.search;
//         const params = new URLSearchParams(search);
//         const user_id = Number(params.get('id'));
            
//         localStorage.setItem('user_id', user_id);
//         return user_id;
//     } catch (error) {
//         console.error('Ошибка при получении user_id:', error);
//         return null;
//     }
// }

// fetchUserId();

// //функция для преобразования тегов в массив слов
// //не работает она
// function getTagsAsArray() {
//     const tagsContainer = document.getElementById('output');
//     if (!tagsContainer) {
//         console.error('Контейнер для тегов не найден');
//         return [];
//     }

//     const tags = [];
//     tagsContainer.querySelectorAll('.word-block').forEach(tagElement => {
//         console.log(tagElement);
//         tags.push(tagElement.textContent.replace('✖', '').trim());
//     });

//     return tags;
// }

// document.getElementById('darkTaskForm').addEventListener('submit', async function (evt) {
//     evt.preventDefault();

//     const userId = localStorage.getItem('user_id');
//     console.log("Вот наш юзер-ид:  ", userId);

//     if (!userId) {
//         console.error("Не удалось получить user_id.");
//         alert("Ошибка: не удалось получить идентификатор пользователя.");
//         return;
//     }

//     const form = evt.target;

//     const task = {
//         'user_id': userId, 
//         'task_name': form.querySelector('[name="name-task"]').value,
//         'task_description': form.querySelector('[name="desc-task"]').value,
//         'task_type': form.querySelector('[name="type-task"]').value,
//         'task_tags': getTagsAsArray(),
//         'task_priority': form.querySelector('[name="priority-level"]').value,
//         'task_date': form.querySelector('[name="day-task"]').value,
//         'task_notification_time': Number(form.querySelector('[name="time-notification"]').value),
//         'task_status': "pending",
//         'task_time': form.querySelector('[name="task-time"]').value,
//     };
//     console.log("Значение поля ввода для времени", form.querySelector('[name="task-time"]').value)
//     console.log("Отправляем задачу:", task);
//     getTaskData(task);
// });

// async function getTaskData(taskData) {
//     fetch('https://flask.stk8s.66bit.ru/tasks', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(taskData),
// })
// .then(response => {
//   if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
//   return response.json();
// })
// .then(data => {
//   console.log('Успех:', data);
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const user_id = Number(params.get('id'));
//   window.location.href = `index.html?id=${user_id}`;
// })
// .catch(error => {
//   console.error('Ошибка:', error);
//   alert('Ошибка отправки: ' + error.message);
// });
// }

// //Не закрывать приложение при свайпе вниз
// document.addEventListener('touchmove', function (task) {
//     if (task.touches && task.touches[0].clientY > 0) {
//         task.preventDefault();
//     }
// }, { passive: false });

// Записываем данные с формы событий и отправляем на сервер

// Записываем данные с формы событий и отправляем на сервер

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

function getTagsAsArray() {
    const tagsContainer = document.getElementById('output');
    if (!tagsContainer) return [];
    return Array.from(tagsContainer.querySelectorAll('.word-block'))
        .map(tagElement => tagElement.textContent.replace('✖', '').trim())
        .filter(tag => tag);
}

function validateDateTime() {
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.querySelector('.task-time');
    const errorDate = document.getElementById('date-error');
    const errorDateTime = document.getElementById('datetime-error');
    
    // Сбрасываем ошибки
    errorDate.style.display = 'none';
    errorDateTime.style.display = 'none';
    
    // 1. Проверка даты (только при отправке формы)
    if (!dateInput.value) {
        errorDate.style.display = 'block';
        errorDate.textContent = 'Пожалуйста, укажите дату';
        return false;
    }
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(dateInput.value);
    
    // Проверяем, что дата не раньше сегодня
    if (selectedDate < today) {
        errorDate.style.display = 'block';
        errorDate.textContent = 'Нельзя указывать дату из прошлого';
        return false;
    }
    
    // 2. Проверка времени (если оно указано)
    if (timeInput.value && timeInput.value.trim()) {
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(timeInput.value.trim())) {
            errorDateTime.style.display = 'block';
            errorDateTime.textContent = 'Некорректный формат времени';
            return false;
        }
        
        // Создаем полную дату и время для сравнения
        const [hours, minutes] = timeInput.value.split(':').map(Number);
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        
        // Проверяем, что выбранное время не в прошлом
        if (selectedDateTime < now) {
            errorDateTime.style.display = 'block';
            errorDateTime.textContent = 'Нельзя указывать время из прошлого';
            return false;
        }
    }
    
    return true;
}

document.getElementById('darkTaskForm').addEventListener('submit', async function(evt) {
    evt.preventDefault();
    // Валидация перед отправкой
    if (!validateDateTime()) {
        return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
        alert("Ошибка: не удалось получить идентификатор пользователя.");
        return;
    }

    const form = evt.target;
    const taskData = {
        'user_id': userId,
        'task_name': form.querySelector('[name="name-task"]').value,
        'task_description': form.querySelector('[name="desc-task"]').value,
        'task_type': form.querySelector('[name="type-task"]').value,
        'task_tags': getTagsAsArray(),
        'task_priority': form.querySelector('[name="priority-level"]').value,
        'task_date': form.querySelector('[name="day-task"]').value,
        'task_notification_time': Number(form.querySelector('[name="time-notification"]').value),
        'task_status': "pending",
        'task_time': form.querySelector('[name="task-time"]').value.trim() || null
    };

    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

        const user_id = new URLSearchParams(window.location.search).get('id');
        window.location.href = `index.html?id=${user_id}`;
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка отправки: ' + error.message);
    }
});

document.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches[0].clientY > 0) {
        e.preventDefault();
    }
}, { passive: false });
