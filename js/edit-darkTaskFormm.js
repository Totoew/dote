// document.getElementById('darkTaskForm').addEventListener('submit', async function (evt) {
//     evt.preventDefault();

//     const userId = localStorage.getItem('user_id');
//     if (!userId) {
//         alert("Ошибка: не удалось получить идентификатор пользователя.");
//         return;
//     }

//     // Получаем оригинальную задачу
//     const originalTask = JSON.parse(localStorage.getItem('current_task_data'));
//     if (!originalTask?.id) {
//         alert("Ошибка: не найден ID задачи для обновления");
//         return;
//     }

//     const form = evt.target;
//     const tags = getTagsAsArray();

//     // Формируем обновленную задачу (сохраняем оригинальный ID)
//     const updatedTask = {
//         id: originalTask.id, // Сохраняем тот же ID
//         user_id: userId,
//         task_name: form.querySelector('[name="name-task"]').value,
//         task_description: form.querySelector('[name="desc-task"]').value,
//         task_type: form.querySelector('[name="type-task"]').value,
//         task_tags: tags,
//         task_priority: form.querySelector('[name="priority-level"]').value,
//         task_date: form.querySelector('[name="day-task"]').value,
//         task_notification_time: Number(form.querySelector('[name="time-notification"]').value),
//         task_status: originalTask.status || "pending",
//         task_time: form.querySelector('[name="task-time"]').value,
//     };

//     try {
//         // 1. Сначала удаляем старую задачу
//         const deleteResponse = await fetch('https://flask.stk8s.66bit.ru/delete', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 user_id: parseInt(userId),
//                 id: originalTask.id,
//                 type: 'task'
//             }),
//         });

//         if (!deleteResponse.ok) {
//             throw new Error('Не удалось удалить старую задачу');
//         }

//         // 2. Затем создаем новую задачу с тем же ID
//         const createResponse = await fetch('https://flask.stk8s.66bit.ru/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedTask),
//         });

//         if (!createResponse.ok) {
//             throw new Error('Не удалось создать обновленную задачу');
//         }

//         const data = await createResponse.json();
//         console.log('Задача успешно обновлена:', data);
//         alert('Изменения сохранены!');
//         window.location.href = 'index.html';
//     } catch (error) {
//         console.error('Ошибка при обновлении задачи:', error);
//         alert('Ошибка при сохранении: ' + error.message);
//     }
// });

// // Вспомогательная функция для получения тегов
// function getTagsAsArray() {
//     const tagsContainer = document.getElementById('output');
//     if (!tagsContainer) return [];
    
//     return Array.from(tagsContainer.querySelectorAll('.word-block')).map(tagElement => {
//         return tagElement.textContent.replace('✖', '').trim();
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    // Находим кнопку и форму
    const submitButton = document.querySelector('.yellow-button');
    const form = document.getElementById('darkTaskForm');
    
    if (!submitButton || !form) return;

    // Вешаем обработчик на клик по кнопке
    submitButton.addEventListener('click', async (evt) => {
        evt.preventDefault(); // Предотвращаем стандартное поведение
        
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            alert("Ошибка: не удалось получить идентификатор пользователя.");
            return;
        }

        // Получаем оригинальную задачу
        const originalTask = JSON.parse(localStorage.getItem('current_task_data'));
        if (!originalTask?.id) {
            alert("Ошибка: не найден ID задачи для обновления");
            return;
        }

        // Формируем обновленную задачу
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
            task_time: form.querySelector('[name="task-time"]').value,
        };

        try {
            // 1. Удаляем старую задачу
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

            // 2. Создаем обновленную задачу
            const createResponse = await fetch('https://flask.stk8s.66bit.ru/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!createResponse.ok) throw new Error('Не удалось обновить задачу');

            alert('Изменения сохранены!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при сохранении: ' + error.message);
        }
    });
});

// Функция для получения тегов
function getTagsAsArray() {
    const tagsContainer = document.getElementById('output');
    if (!tagsContainer) return [];
    
    return Array.from(tagsContainer.querySelectorAll('.word-block')).map(tagElement => {
        return tagElement.textContent.replace('✖', '').trim();
    });
}