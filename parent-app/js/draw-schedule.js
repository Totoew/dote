const currentId = document.querySelector('.current-id');
const dateInput = document.querySelector('.date-input');
let EVENT_DATA = null;

async function filterAndRenderTasks() {
    try {
        if (EVENT_DATA === null) {
            const rawEvents = await fetchTasks();
            EVENT_DATA = transformTasks(rawEvents);
        }
        
        const filteredEvents = EVENT_DATA.filter(event => {
            const eventDate = new Date(event.event_date).toISOString().split('T')[0];
            return eventDate === dateInput.value;
        });   
        renderTasks(filteredEvents);
    } catch (error) {
        console.error('Ошибка загрузки событий:', error);
    }
}

async function fetchTasks() {
    try {
        const userId = currentId.value;
            
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
        console.error('Ошибка при получении событий:', error);
        return [];
    }
}

function transformTasks(eventsArray) {
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

function renderTasks(events) {
    const container = document.querySelector('.container');
    if (!container) return;
        
    container.style.position = 'relative';
    container.innerHTML = '';
        
    const template = document.getElementById('EventCardTemplate');
    if (!template) return;

    events.forEach(event => {
        const startTime = event.event_time_first;
        const endTime = event.event_time_second;
            
        const startHours = Number(startTime.slice(0, 2));
        const startMinutes = Number(startTime.slice(3, 5));
        const endHours = Number(endTime.slice(0, 2));
        const endMinutes = Number(endTime.slice(3, 5));

        const topPosition = 78 * startHours + Math.round((startMinutes / 60) * 78) + 6;
        const height = calculateEventHeight(startHours, startMinutes, endHours, endMinutes);

        const eventElement = template.content.cloneNode(true);
        const articleElement = eventElement.querySelector('.event-in-calendar');

        if (!articleElement) return;

        // Заполнение данных события
        eventElement.querySelector('.event-name').textContent = event.event_name;
        eventElement.querySelector('.event-time').textContent = `${event.event_time_first} - ${event.event_time_second}`;
        articleElement.dataset.eventId = event.event_id;
        articleElement.dataset.date = event.event_date;
        // ... другие данные события

        // Позиционирование
        articleElement.style.position = 'absolute';
        articleElement.style.top = `${topPosition}px`;
        articleElement.style.height = `${height}px`;

        container.appendChild(eventElement);
    });
}

// Вычисление высоты события
function calculateEventHeight(startH, startM, endH, endM) {
    if (endH > startH || (endH === startH && endM > startM)) {
        const height = ((endH + endM/60) - (startH + startM/60)) * 78;
        return Math.max(height, 12) - 12;
    }
    return 78 * (24 - (startH + startM/60)) - 12;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    await filterAndRenderTasks();
    
    // Блокировка свайпа
    document.addEventListener('touchmove', (e) => {
        if (e.touches?.[0]?.clientY > 0) {
            e.preventDefault();
        }
    }, { passive: false });

    // Разрешение скролла в контейнере
    const scrollBox = document.querySelector('.list-tasks');
    if (scrollBox) {
        scrollBox.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        }, { passive: true });
    }
});

dateInput.addEventListener('change', async () => await filterAndRenderTasks());
currentId.addEventListener('change', async () => {
    EVENT_DATA = null;
    await filterAndRenderTasks();
});