async function deleteEventOnServer(eventId) {
    const response = await fetch('https://flask.stk8s.66bit.ru/delete', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
            user_id: localStorage.getItem('user_id'),
            event_id: eventId,
            type: 'event',
        })
    });
    if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
}

function handleDeleteClick(e) {
    const deleteWindow = document.getElementById('delete-window-id');
    if (deleteWindow) {
        deleteWindow.classList.remove('hidden');
        const eventCard = e.target.closest('.event-in-calendar');
        if (eventCard) {
            deleteWindow.dataset.eventId = eventCard.dataset.eventId;
        }
    }
}

async function confirmDelete() {
    const deleteWindow = document.getElementById('delete-window-id');
    if (!deleteWindow) return;

    const eventId = deleteWindow.dataset.eventId;
    if (eventId) {
        try {
            await deleteEventOnServer(eventId);
            if (window.refreshEvents) {
                await window.refreshEvents();
            }
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Не удалось удалить событие');
        }
    }
    deleteWindow.classList.add('hidden');
}

function cancelDelete() {
    const deleteWindow = document.getElementById('delete-window-id');
    if (deleteWindow) {
        deleteWindow.classList.add('hidden');
    }
}

// Инициализация обработчиков удаления

function setupDeleteHandlers() {
    document.querySelectorAll('.icon-button').forEach(button => {
        button.addEventListener('click', handleDeleteClick);
    });

    document.querySelector('.confirm-true')?.addEventListener('click', confirmDelete);
    document.querySelector('.confirm-false')?.addEventListener('click', cancelDelete);
}

// Экспортируем функцию для вызова из основного файла
window.setupDeleteHandlers = setupDeleteHandlers;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', setupDeleteHandlers);