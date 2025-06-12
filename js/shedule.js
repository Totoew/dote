function filterEventsByDate(selectedDate) {
    const events = document.querySelectorAll(".event-in-calendar"); // Все события

    events.forEach(eventElement => {
        const eventDate = eventElement.getAttribute("data-date"); // Дата события из data-date
        if (eventDate === selectedDate) {
            eventElement.parentElement.style.display = ""; // Показываем событие
        } else {
            eventElement.parentElement.style.display = "none"; // Скрываем событие
        }
    });
}

// Обновляем handleDateChange для фильтрации
function handleDateChange(event) {
    const datePicker = event.target;
    const selectedDate = datePicker.value; // Получаем выбранную дату в формате YYYY-MM-DD

    const dayWeekElement = document.querySelector('.day-week');
    const dayNumberElement = document.querySelector('.day-number');
    const monthElement = document.querySelector('.tasks-panel-h1');

    const selectedDateObj = new Date(selectedDate);
    dayWeekElement.textContent = getDayOfWeek(selectedDateObj);
    dayNumberElement.textContent = selectedDateObj.getDate();
    monthElement.textContent = getMonthName(selectedDateObj);

    datePicker.style.display = "none";

    // Вызываем фильтрацию событий
    filterEventsByDate(selectedDate);
}


function showDatePicker() {
    const datePicker = document.getElementById("datePicker");
    datePicker.style.display = "block";
    datePicker.focus(); 
}

// Функция для получения названия дня недели
function getDayOfWeek(date) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
}

// Функция для получения названия месяца
function getMonthName(date) {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return months[date.getMonth()];
}

//Функция, которая по умолчанию ставит текущую дату 
//на странице
function getCurrentDate() {
    let today = new Date();
    const year = today.getFullYear();
    const month1 = today.getMonth();
    const day = today.getDate();

    const dateString = `${year}-${(month1+ 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    today = new Date(dateString);

    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayOfWeek = daysOfWeek[today.getDay()];
    document.querySelector('.day-week').textContent = dayOfWeek;

    const dayNumber = today.getDate().toString().padStart(2, '0');
    document.querySelector('.day-number').textContent = dayNumber;

    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 
                    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const month = months[today.getMonth()];
    document.querySelector('.tasks-panel-h1').textContent = month;

    // Устанавливаем текущую дату в поле выбора даты
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        const formattedDate = today.toISOString().split('T')[0]; // Формат YYYY-MM-DD
        datePicker.value = formattedDate;

        // Вызываем фильтрацию событий по сегодняшней дате
        filterEventsByDate(formattedDate);
    }
    
}

window.onload = getCurrentDate;

// Отключаем свайп вниз на уровне документа
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });

// Разрешаем скролл внутри контейнера .scroll-box
const scrollBox = document.querySelector('.list-tasks');
scrollBox.addEventListener('touchmove', function (event) {
    event.stopPropagation();
}, { passive: true });

const search = window.location.search;
const links = document.querySelectorAll('.nav-item a');

const createLink = document.querySelector('.a-none-decorat');
const href = createLink.getAttribute('href');
if (href && href !== '') {
    const separator = href.includes('?') ? '&' : '?';
    createLink.setAttribute('href', href + (search ? separator + search.slice(1) : ''));
    console.log(createLink.getAttribute('href'));
}

links.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href !== '') {
    const separator = href.includes('?') ? '&' : '?';
    link.setAttribute('href', href + (search ? separator + search.slice(1) : ''));
  }
});

// Добавляем обработчик для кнопок удаления
function setupDeleteButtons() {
    document.addEventListener('click', function(e) {
        // Проверяем, был ли клик по кнопке удаления
        if (e.target.closest('.icon-button') || e.target.classList.contains('icon-image')) {
            e.preventDefault();
            e.stopPropagation();
            
            // Показываем окно подтверждения
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                deleteWindow.classList.remove('hidden');
                
                // Получаем ID события из ближайшего элемента события
                const eventCard = e.target.closest('.event-in-calendar');
                const eventId = eventCard ? eventCard.dataset.eventId : null;
                
                // Обработчики для кнопок подтверждения
                const confirmTrue = deleteWindow.querySelector('.confirm-true');
                const confirmFalse = deleteWindow.querySelector('.confirm-false');
                
                // Удаляем старые обработчики
                confirmTrue.onclick = null;
                confirmFalse.onclick = null;
                
                // Добавляем новые обработчики
                confirmTrue.onclick = function() {
                    if (eventId) {
                        deleteEvent(eventId).then(() => {
                            // Обновляем список событий после удаления
                            CalendarManager.filterAndRenderEvents();
                        });
                    }
                    deleteWindow.classList.add('hidden');
                };
                
                confirmFalse.onclick = function() {
                    deleteWindow.classList.add('hidden');
                };
                
                // Закрытие при клике вне окна
                document.addEventListener('click', function closeWindow(evt) {
                    if (!deleteWindow.contains(evt.target)) {
                        deleteWindow.classList.add('hidden');
                        document.removeEventListener('click', closeWindow);
                    }
                });
            }
        }
    });
}

// Функция для удаления события
async function deleteEvent(eventId) {
    try {
        const userId = localStorage.getItem('user_id');
        if (!userId) return false;
        
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация календаря
    CalendarManager.init();
    
    // Настройка обработчиков кнопок удаления
    setupDeleteButtons();
    
    // Блокировка свайпа
    document.addEventListener('touchmove', function(e) {
        if (e.touches?.[0]?.clientY > 0) {
            e.preventDefault();
        }
    }, { passive: false });
});