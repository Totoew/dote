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

//Функция, которая по умолчанию ставит текущую дату 
//на странице
function getCurrentDate() {
    let today = new Date();
    
    let daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    let dayOfWeek = daysOfWeek[today.getDay()];
    document.querySelector('.day-week').textContent = dayOfWeek;

    let dayNumber = today.getDate().toString().padStart(2, '0');
    document.querySelector('.day-number').textContent = dayNumber;

    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 
                  'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let month = months[today.getMonth()];
    document.querySelector('.tasks-panel-h1').textContent = month;
}

window.onload = getCurrentDate;