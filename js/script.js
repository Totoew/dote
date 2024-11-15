document.getElementById('mySelect').addEventListener('change', function() {
    this.style.color = 'white'; // Устанавливаем цвет текста белым
});

document.getElementById("mySelect").addEventListener("change", function () {
    if (this.value !== "") {
        // Если выбрана любая другая опция, кроме "Выберите..."
        this.querySelectorAll("option")[0].style.display = "none"; // Скрываем первый элемент (Выберите...)
    } else {
        this.options[0].style.display = ""; // Показываем обратно, если ничего не выбрано
    }
});
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

//create-new-event
function updateMinutesLabel(value) {
    const minutesLabel = document.getElementById('minutes-label');
    
    if (value === '1') {
        minutesLabel.textContent = 'минуту';
    } else if (value >= 2 && value <= 4) {
        minutesLabel.textContent = 'минуты';
    } else {
        minutesLabel.textContent = 'минут';
    }
}