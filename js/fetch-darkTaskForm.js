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
        return false;
    }
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(dateInput.value);
    
    // Проверяем, что дата не раньше сегодня
    if (selectedDate < today) {
        errorDate.style.display = 'block';
        return false;
    }
    
    // 2. Проверка времени (если оно указано)
    if (timeInput.value && timeInput.value.trim()) {
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(timeInput.value.trim())) {
            errorDateTime.style.display = 'block';
            return false;
        }
        
        // Создаем полную дату и время для сравнения
        const [hours, minutes] = timeInput.value.split(':').map(Number);
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        
        // Проверяем, что выбранное время не в прошлом
        if (selectedDateTime < now) {
            errorDateTime.style.display = 'block';
            showToast("Нельзя выбрать время в прошлом");
            return;
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

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 1000);
}
