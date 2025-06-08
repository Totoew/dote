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