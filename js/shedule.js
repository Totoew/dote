function handleDateChange(event) {
    const datePicker = event.target;
    const selectedDate = new Date(datePicker.value);

    // Находим нужные элементы в DOM
    const dayWeekElement = document.querySelector('.day-week');
    const dayNumberElement = document.querySelector('.day-number');
    const monthElement = document.querySelector('.tasks-panel-h1');

    // Заполняем элементы данными
    dayWeekElement.textContent = getDayOfWeek(selectedDate);
    dayNumberElement.textContent = selectedDate.getDate();
    monthElement.textContent = getMonthName(selectedDate);

    // Скрываем поле ввода
    datePicker.style.display = "none";
}

function showDatePicker() {
    const datePicker = document.getElementById("datePicker");
    datePicker.style.display = "block";
    datePicker.focus(); // Открыть календарь
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