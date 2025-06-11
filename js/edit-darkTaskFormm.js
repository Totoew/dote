// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('darkTaskForm');
//     const submitButton = document.querySelector('.yellow-button');

//     if (!form || !submitButton) return;

//     // Блокируем отправку формы по Enter
//     form.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
//             e.preventDefault();
//         }
//     });

//     submitButton.addEventListener('click', async (evt) => {
//         evt.preventDefault(); // Блокируем стандартную отправку

//         if (!validateDateTime()) return;

//         const search = window.location.search;
//         const params = new URLSearchParams(search);
//         const userId = Number(params.get('id'));

//         if (!userId) {
//             alert("Ошибка: не удалось получить идентификатор пользователя.");
//             return;
//         }

//         const originalTask = JSON.parse(localStorage.getItem('current_task_data'));
//         if (!originalTask?.id) {
//             alert("Ошибка: не найден ID задачи для обновления");
//             return;
//         }

//         const updatedTask = {
//             id: originalTask.id,
//             user_id: userId,
//             task_name: form.querySelector('[name="name-task"]').value,
//             task_description: form.querySelector('[name="desc-task"]').value,
//             task_type: form.querySelector('[name="type-task"]').value,
//             task_tags: getTagsAsArray(),
//             task_priority: form.querySelector('[name="priority-level"]').value,
//             task_date: form.querySelector('[name="day-task"]').value,
//             task_notification_time: Number(form.querySelector('[name="time-notification"]').value),
//             task_status: originalTask.status || "pending",
//             task_time: form.querySelector('[name="task-time"]').value.trim() || null,
//         };

//         try {
//             const deleteResponse = await fetch('https://flask.stk8s.66bit.ru/delete', {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     user_id: userId,
//                     id: originalTask.id,
//                     type: 'task'
//                 }),
//             });

//             if (!deleteResponse.ok) throw new Error('Не удалось удалить задачу');

//             const createResponse = await fetch('https://flask.stk8s.66bit.ru/tasks', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedTask),
//             });

//             if (!createResponse.ok) throw new Error('Не удалось обновить задачу');

//             window.location.href = `index.html?id=${userId}`;
//         } catch (error) {
//             console.error('Ошибка:', error);
//             alert('Ошибка при сохранении: ' + error.message);
//         }
//     });
// });

// function getTagsAsArray() {
//     const tagsContainer = document.getElementById('output');
//     if (!tagsContainer) return [];
//     return Array.from(tagsContainer.querySelectorAll('.word-block'))
//         .map(tagElement => tagElement.textContent.replace('✖', '').trim())
//         .filter(tag => tag);
// }

// function validateDateTime() {
//     const dateInput = document.getElementById('dateInput');
//     const timeInput = document.querySelector('.task-time');
//     const errorDate = document.getElementById('date-error');
//     const errorDateTime = document.getElementById('datetime-error');

//     errorDate.style.display = 'none';
//     errorDateTime.style.display = 'none';

//     if (!dateInput.value) {
//         errorDate.style.display = 'block';
//         errorDate.textContent = 'Пожалуйста, укажите дату';
//         return false;
//     }

//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const selectedDate = new Date(dateInput.value);

//     if (selectedDate < today) {
//         errorDate.style.display = 'block';
//         errorDate.textContent = 'Нельзя указывать дату из прошлого';
//         return false;
//     }

//     if (timeInput.value && timeInput.value.trim()) {
//         const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
//         if (!timeRegex.test(timeInput.value.trim())) {
//             errorDateTime.style.display = 'block';
//             errorDateTime.textContent = 'Некорректный формат времени';
//             return false;
//         }

//         const [hours, minutes] = timeInput.value.split(':').map(Number);
//         const selectedDateTime = new Date(selectedDate);
//         selectedDateTime.setHours(hours, minutes, 0, 0);

//         if (selectedDateTime < now) {
//             errorDateTime.style.display = 'block';
//             errorDateTime.textContent = 'Нельзя указывать время из прошлого';
//             return false;
//         }
//     }

//     return true;
// }

// // Запрет скролла (если нужен)
// document.addEventListener('touchmove', function(e) {
//     if (e.touches && e.touches[0].clientY > 0) {
//         e.preventDefault();
//     }
// }, { passive: false });

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('.yellow-button');
    const form = document.getElementById('darkTaskForm');
    
    if (!submitButton || !form) return;

    // Запрет отправки формы по нажатию Enter
    form.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter' && evt.target.tagName !== 'TEXTAREA') {
            evt.preventDefault();
        }
    });

    submitButton.addEventListener('click', async (evt) => {
        evt.preventDefault(); 

        if (!validateDateTime()) {
            return;
        }

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const userId = Number(params.get('id'));
        if (!userId) {
            alert("Ошибка: не удалось получить идентификатор пользователя.");
            return;
        }

        const originalTask = JSON.parse(localStorage.getItem('current_task_data'));
        if (!originalTask?.id) {
            alert("Ошибка: не найден ID задачи для обновления");
            return;
        }

        const updatedTask = {
            id: originalTask.id,
            user_id: userId,
            task_name: form.querySelector('[name="name-task"]').value,
            task_description: form.querySelector('[name="desc-task"]').value,
            task_type: form.querySelector('[name="type-task"]').value,
            task_tags: getTagsAsArray(),
            task_priority: form.querySelector('[name="priority-level"]').value,
            task_date: form.querySelector('[name="day-task"]').value,
            task_notification_time: Number(form.querySelector('[name="time-notification"]').value),
            task_status: originalTask.status || "pending",
            task_time: form.querySelector('[name="task-time"]').value.trim() || null,
        };

        try {
            // Удаляем старую задачу
            const deleteResponse = await fetch('https://flask.stk8s.66bit.ru/delete', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    id: originalTask.id,
                    type: 'task'
                }),
            });

            if (!deleteResponse.ok) throw new Error('Не удалось удалить задачу');

            // Создаем/обновляем задачу
            const createResponse = await fetch('https://flask.stk8s.66bit.ru/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!createResponse.ok) throw new Error('Не удалось обновить задачу');

            window.location.href = `index.html?id=${userId}`;
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при сохранении: ' + error.message);
        }
    });
});

function getTagsAsArray() {
    const tagsContainer = document.getElementById('output');
    if (!tagsContainer) return [];
    return Array.from(tagsContainer.querySelectorAll('.word-block'))
        .map(tagElement => tagElement.textContent.replace('✖', '').trim())
        .filter(tag => tag);
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.style.display = 'block';
        el.style.color = 'red';
        el.style.fontSize = '0.9em';
        el.style.marginTop = '4px';
    }
}

function hideError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = '';
        el.style.display = 'none';
    }
}

function validateDateTime() {
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.querySelector('.task-time');
    const errorDateId = 'date-error';
    const errorDateTimeId = 'datetime-error';
    
    hideError(errorDateId);
    hideError(errorDateTimeId);
    
    if (!dateInput.value) {
        showError(errorDateId, 'Пожалуйста, укажите дату');
        return false;
    }
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(dateInput.value);
    
    if (selectedDate < today) {
        showError(errorDateId, 'Нельзя указывать дату из прошлого');
        return false;
    }
    
    if (timeInput.value && timeInput.value.trim()) {
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(timeInput.value.trim())) {
            showError(errorDateTimeId, 'Некорректный формат времени');
            return false;
        }
        
        const [hours, minutes] = timeInput.value.split(':').map(Number);
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        
        if (selectedDateTime < now) {
            showError(errorDateTimeId, 'Нельзя указывать время из прошлого');
            return false;
        }
    }
    return true;
}

document.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches[0].clientY > 0) {
        e.preventDefault();
    }
}, { passive: false });
