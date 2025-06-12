// Объект для управления календарем и событиями
const CalendarManager = {
    selectedDate: '',
    EVENT_DATA: [],
    datePicker: null,
    
    // Инициализация при загрузке страницы
    init: function() {
        this.setupDatePicker();
        this.setupEventListeners();
        this.filterAndRenderEvents();
        this.setCurrentDate();
    },
    
    // Настройка элемента выбора даты
    setupDatePicker: function() {
        this.datePicker = document.getElementById('datePicker');
        if (!this.datePicker) {
            console.error('Элемент datePicker не найден');
            return;
        }
    },
    
    // Настройка обработчиков событий
    setupEventListeners: function() {
        if (this.datePicker) {
            this.datePicker.addEventListener('change', (e) => this.handleDateChange(e));
        }
        
        // Обработчик для кнопки показа datePicker (если есть)
        const showDatePickerBtn = document.querySelector('.show-datepicker');
        if (showDatePickerBtn) {
            showDatePickerBtn.addEventListener('click', () => this.showDatePicker());
        }
    },
    
    // Установка текущей даты по умолчанию
    setCurrentDate: function() {
        if (!this.datePicker) return;
        
        let today = new Date();
        const year = today.getFullYear();
        const month1 = today.getMonth();
        const day = today.getDate();

        const dateString = `${year}-${(month1+ 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        today = new Date(dateString);
        const formattedDate = today.toISOString().split('T')[0];
        
        this.datePicker.value = formattedDate;
        this.selectedDate = formattedDate;
        this.updateDateDisplay(today);
    },
    
    // Обработчик изменения даты
    handleDateChange: function(event) {
        const selectedDate = event.target.value;
        const selectedDateObj = new Date(selectedDate);
        
        this.selectedDate = selectedDate;
        this.updateDateDisplay(selectedDateObj);
        this.filterAndRenderEvents();
        
        if (this.datePicker) {
            this.datePicker.style.display = "none";
        }
    },
    
    // Обновление отображения даты в интерфейсе
    updateDateDisplay: function(date) {
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        
        const dayWeekElement = document.querySelector('.day-week');
        const dayNumberElement = document.querySelector('.day-number');
        const monthElement = document.querySelector('.tasks-panel-h1');
        
        if (dayWeekElement) dayWeekElement.textContent = days[date.getDay()];
        if (dayNumberElement) dayNumberElement.textContent = date.getDate();
        if (monthElement) monthElement.textContent = months[date.getMonth()];
    },
    
    showDatePicker: function() {
        if (this.datePicker) {
            this.datePicker.style.display = "block";
            this.datePicker.focus();
        }
    },

    // Загрузка событий с сервера
    async fetchEvents() {
        try {
            const userId = this.fetchUserId();
            if (!userId) throw new Error('Не удалось получить user_id');
            
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
    },

    fetchUserId() {
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
    },

    // Преобразование данных событий
    transformEvents(eventsArray) {
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
    },

    async filterAndRenderEvents() {
        try {
            const rawEvents = await this.fetchEvents();
            this.EVENT_DATA = this.transformEvents(rawEvents);

            if (!this.selectedDate) {
                this.renderEvents(this.EVENT_DATA);
                return;
            }
            
            // Фильтруем события по выбранной дате
            const filteredEvents = this.EVENT_DATA.filter(event => {
                const eventDate = new Date(event.event_date).toISOString().split('T')[0];
                return eventDate === this.selectedDate;
            });
            
            this.renderEvents(filteredEvents);
        } catch (error) {
            console.error('Ошибка загрузки событий:', error);
        }
    },

  //Отрисовка событий
    renderEvents(events) {
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

            const topPosition = 78 * startHours + Math.round((startMinutes / 60) * 78);
            const height = this.calculateEventHeight(startHours, startMinutes, endHours, endMinutes);

            const eventElement = template.content.cloneNode(true);
            const articleElement = eventElement.querySelector('.event-in-calendar');

            if (!articleElement) return;

            // Заполнение данных события
            eventElement.querySelector('.event-name').textContent = event.event_name;
            articleElement.dataset.eventId = event.event_id;
            articleElement.dataset.date = event.event_date;
            // ... другие данные события

            // Позиционирование
            articleElement.style.position = 'absolute';
            articleElement.style.top = `${topPosition}px`;
            articleElement.style.height = `${height}px`;

            articleElement.addEventListener('click', (e) => {
                if (e.target.closest('.icon-button') || e.target.classList.contains('icon-image')) {
                    // Клик был по кнопке удаления — игнорируем переход
                    return;
                }

                localStorage.setItem('current_event_data', JSON.stringify(event));
                const search = window.location.search;
                const params = new URLSearchParams(search);
                const user_id = Number(params.get('id'));
                window.location.href = `event-details.html?id=${user_id}`;
            });

            container.appendChild(eventElement);

            const lastInsertedCards = container.querySelectorAll('.event-in-calendar');
            const lastCard = lastInsertedCards[lastInsertedCards.length - 1]; 
            const deleteBtn = lastCard.querySelector('.icon-button');

            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    showDeleteConfirmation(event.event_id);
                });
            }
        });
    },

    calculateEventHeight(startH, startM, endH, endM) {
        if (endH > startH || (endH === startH && endM > startM)) {
            const height = ((endH + endM/60) - (startH + startM/60)) * 78;
            return Math.max(height, 12);
        }
        return 78 * (24 - (startH + startM/60));
    },

    async deleteEvent(eventId, userId) {
        try {
            const response = await fetch('https://flask.stk8s.66bit.ru/delete', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: parseInt(userId),
                    id: eventId,
                    type: 'event',
                }),
            });
            
            return response.ok;
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            return false;
        }
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    CalendarManager.init();
    
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

window.refreshEvents = () => CalendarManager.filterAndRenderEvents();

document.addEventListener('DOMContentLoaded', () => CalendarManager.filterAndRenderEvents());

let currentDeleteEventId = null;

function showDeleteConfirmation(eventId) {
    currentDeleteEventId = eventId;
    const deleteWindow = document.getElementById('delete-window-id');
    deleteWindow.classList.remove('hidden');
}

document.querySelector('.confirm-true').addEventListener('click', async () => {
    if (currentDeleteEventId === null) return;

    const userId = Number(new URLSearchParams(window.location.search).get('id'));
    const success = await CalendarManager.deleteEvent(currentDeleteEventId, userId);

    if (success) {
        CalendarManager.filterAndRenderEvents();
    } else {
        alert('Ошибка при удалении');
    }

    document.getElementById('delete-window-id').classList.add('hidden');
    currentDeleteEventId = null;
});

document.querySelector('.confirm-false').addEventListener('click', () => {
    document.getElementById('delete-window-id').classList.add('hidden');
    currentDeleteEventId = null;
});

// В renderEvents при клике на кнопку удаления:
articleElement.querySelector('.icon-button').addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы не срабатывал клик по карточке
    showDeleteConfirmation(event.event_id);
});
