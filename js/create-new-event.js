
function replaceWithFormattedDate() {
    const input = document.getElementById('dateInput');
    const dateValue = new Date(input.value);

    // Массив названий месяцев
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    if (!isNaN(dateValue)) {
        const day = dateValue.getDate();
        const monthIndex = dateValue.getMonth();

        const formattedDate = `${day} ${months[monthIndex]}`;

        // Создаем новый span с отформатированной датой
        const span = document.createElement('span');
        span.className = 'date-span'; // Применяем класс для стилей
        span.innerText = formattedDate;

        // Удаляем input и вставляем span на его место
        const container = document.getElementById('dateContainer');
        container.removeChild(input);
        container.appendChild(span);
    }
}

document.querySelector('.start-event-time').addEventListener('input', function(e) {
    const timeInput = e.target.value;
    const validTimeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!validTimeRegex.test(timeInput)) {
        e.target.setCustomValidity('Время должно быть в формате ЧЧ:MM (например, 14:30)');
    } else {
        e.target.setCustomValidity('');
    }
});

document.querySelector('.finish-event-time').addEventListener('input', function(e) {
    const timeInput = e.target.value;
    const validTimeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!validTimeRegex.test(timeInput)) {
        e.target.setCustomValidity('Время должно быть в формате ЧЧ:MM (например, 14:30)');
    } else {
        e.target.setCustomValidity('');
    }
});

//Склонение слова "минут"
function updateMinutesLabel(value) {
    const minutesLabel = document.getElementById('minutes-label');
    
    // Преобразуем значение value в целое число
    const numberValue = parseInt(value);
    
    // Проверяем последние две цифры числа
    const lastTwoDigits = numberValue % 100;
    
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13 || lastTwoDigits === 14) {
        minutesLabel.textContent = 'минут';
    } else if (lastTwoDigits % 10 === 1) {
        minutesLabel.textContent = 'минуту';
    } else if (lastTwoDigits % 10 >= 2 && lastTwoDigits % 10 <= 4) {
        minutesLabel.textContent = 'минуты';
    } else {
        minutesLabel.textContent = 'минут';
    }
}

