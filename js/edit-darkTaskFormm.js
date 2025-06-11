document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.querySelector('.yellow-button');
    const form = document.getElementById('darkTaskForm');
    
    if (!submitButton || !form) return;

    submitButton.addEventListener('click', async (evt) => {
        evt.preventDefault(); 
        
        //const userId = localStorage.getItem('user_id');
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
            task_time: form.querySelector('[name="task-time"]').value,
        };

        try {
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

            const createResponse = await fetch('https://flask.stk8s.66bit.ru/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (!createResponse.ok) throw new Error('Не удалось обновить задачу');

            const search = window.location.search;
            const params = new URLSearchParams(search);
            const user_id = Number(params.get('id'));
            window.location.href = `index.html?id=${user_id}`;
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при сохранении: ' + error.message);
        }
    });
});

function getTagsAsArray() {
    const tagsContainer = document.getElementById('output');
    if (!tagsContainer) return [];
    
    return Array.from(tagsContainer.querySelectorAll('.word-block')).map(tagElement => {
        return tagElement.textContent.replace('✖', '').trim();
    });
}