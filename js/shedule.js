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

/*
function handleDateChange(event) {
    const datePicker = event.target;
    const selectedDate = new Date(datePicker.value);

    const dayWeekElement = document.querySelector('.day-week');
    const dayNumberElement = document.querySelector('.day-number');
    const monthElement = document.querySelector('.tasks-panel-h1');

    dayWeekElement.textContent = getDayOfWeek(selectedDate);
    dayNumberElement.textContent = selectedDate.getDate();
    monthElement.textContent = getMonthName(selectedDate);

    datePicker.style.display = "none";
}
*/
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
    const today = new Date();

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

