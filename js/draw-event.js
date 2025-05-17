const template = document.getElementById('EventCardTemplate');
const container = document.querySelector('.container');
let EVENT_DATA = [];

async function fetchUserId() {
    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

async function fetchEvents(userId) {
    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                table_name: "events"
            })
        });
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const data = await response.json();
        return data.objects || [];
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

function transformEvents(eventsArray) {
    return eventsArray.map(event => ({
        event_id: event[0],
        user_id: event[1],
        event_type: event[2],
        event_name: event[3],
        event_description: event[4],
        event_date: event[5],
        event_notification_time: event[6],
        event_status: event[7],
        event_time_first: event[8],
        event_time_second: event[9]
    }));
}

async function deleteEventById(eventId) {
    try {
        const userId = localStorage.getItem('user_id'); 
        const response = await fetch('https://flask.stk8s.66bit.ru/delete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: parseInt(userId), // Преобразуем в число
                id: eventId,
                type: 'event',
            }),
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log('Успех:', result.message);
            return true;
        } else if (response.status === 400) {
            const error = await response.json();
            console.error('Ошибка:', error.message);
            return false;
        } else {
            console.error('Неожиданный статус:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Сетевая ошибка:', error);
        return false;
    }
}

// Функция отрисовки событий
function renderEvents(events) {
    if (!container) return;
    container.style.position = 'relative';
    container.innerHTML = '';

    events.forEach(event => {
        const startTime = event.event_time_first;
        const endTime = event.event_time_second;
        const intBeginningStartTime = Number(startTime.slice(0, 2));
        const intEndStartTime = Number(startTime.slice(3, 5));
        const intBeginningFinishTime = Number(endTime.slice(0, 2));
        const intEndFinishTime = Number(endTime.slice(3, 5));

        const topPosition = 78 * intBeginningStartTime + Math.round((intEndStartTime / 60) * 78);
        const heightEventCard = calculateHeightEventCard(
            intBeginningFinishTime,
            intEndFinishTime,
            intBeginningStartTime,
            intEndStartTime
        );

        const templateContent = template.content.cloneNode(true);
        const eventNameElement = templateContent.querySelector('.event-name');
        eventNameElement.textContent = event.event_name;

        const articleElement = templateContent.querySelector('.event-in-calendar');
        articleElement.dataset.eventId = event.event_id;
        articleElement.dataset.userId = event.user_id;
        articleElement.dataset.description = event.event_description;
        articleElement.dataset.type = event.event_type;
        articleElement.dataset.notificationTime = event.event_notification_time;
        articleElement.dataset.status = event.event_status;
        articleElement.dataset.date = event.event_date;

        articleElement.addEventListener('click', () => {
            localStorage.setItem('current_event_data', JSON.stringify(event));
            window.location.href = 'event-details.html';
        });

        const deleteButton = templateContent.querySelector('.icon-button');  // Находим кнопку внутри клона

        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события (чтобы не сработал клик по карточке
            const eventId = event.event_id;  // Получаем eventId

            // Показываем окно подтверждения
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                deleteWindow.classList.remove('hidden');

                // Обработчик для кнопки "Да"
                const confirmTrueButton = deleteWindow.querySelector('.confirm-true');
                const confirmFalseButton = deleteWindow.querySelector('.confirm-false');

                // Сначала удаляем старые обработчики, чтобы не плодить их
                confirmTrueButton.onclick = null;
                confirmFalseButton.onclick = null;

                confirmTrueButton.onclick = () => {
                    deleteEventById(eventId)
                        .then(success => {
                            if (success) {
                                console.log(`Событие с ID ${eventId} успешно удалено.`);
                                loadAndRenderEvents(); // Обновляем список событий
                            } else {
                                console.error(`Не удалось удалить событие с ID ${eventId}.`);
                                alert("Не удалось удалить событие."); // Сообщаем об ошибке
                            }
                        });
                    deleteWindow.classList.add('hidden'); // Скрываем окно после удаления
                };

                // Обработчик для кнопки "Отмена"
                confirmFalseButton.onclick = () => {
                    deleteWindow.classList.add('hidden'); 
                };
                document.addEventListener('mousedown', (event) => {
                const deleteWindow = document.getElementById('delete-window-id');

                if (deleteWindow && !deleteWindow.classList.contains('hidden')) {
                    if (!deleteWindow.contains(event.target)) {
                    deleteWindow.classList.add('hidden');
                    }
                }
                });
            } else {
                console.error('Элемент #delete-window-id не найден.');
                alert('Не удалось отобразить окно подтверждения.');
            }
        });

        articleElement.style.position = 'absolute';
        articleElement.style.top = `${topPosition}px`;
        articleElement.style.height = `${heightEventCard}px`;
        articleElement.style.left = '0';
        articleElement.style.right = '0';
        articleElement.style.zIndex = '10';

        container.appendChild(templateContent);
    });
}

function calculateHeightEventCard(one, two, three, four) {
    if (one > three || (one === three && two > four)) {
        const calculatedHeight = (((one + two / 60) - (three + four / 60)) * 78).toFixed(1);
        return Math.max(calculatedHeight, 12);
    } else {
        return 78 * (24 - (three + four / 60));
    }
}

// Блокировка свайпа
document.addEventListener('touchmove', (e) => {
    if (e.touches?.[0]?.clientY > 0) {
        e.preventDefault();
    }
}, { passive: false });

// Основная функция загрузки и отрисовки
async function loadAndRenderEvents() {
    try {
        const userId = await fetchUserId();
        if (!userId) {
            throw new Error('Не удалось получить user_id');
        }
        localStorage.setItem('user_id', userId);

        const rawEvents = await fetchEvents(userId);
        EVENT_DATA = transformEvents(rawEvents);
        renderEvents(EVENT_DATA);
    } catch (error) {
        console.error('Ошибка загрузки событий:', error);
        alert('Не удалось загрузить события');
    }
}

// Функция для обновления событий после удаления
window.refreshEvents = loadAndRenderEvents;

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', loadAndRenderEvents);
