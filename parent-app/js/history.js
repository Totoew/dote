document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.querySelector('.date-input');
    const dateImage = document.querySelector('.date-image');
    const chosenDate = document.querySelector('.chosen-date');


    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    dateImage.addEventListener('click', () => {
        dateInput.click();
    });

    dateInput.addEventListener('change', () => {
        const selectedDate = new Date(dateInput.value);

        if (!isNaN(selectedDate)) {
            const dayOfWeek = daysOfWeek[selectedDate.getDay()];
            const day = selectedDate.getDate();
            const month = months[selectedDate.getMonth()];
            const year = selectedDate.getFullYear();

            chosenDate.textContent = `${dayOfWeek}, ${day} ${month} ${year} года`;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {s
    const dateInput = document.querySelector('.date-input');
    const dateImage = document.querySelector('.date-image');
    const chosenDate = document.querySelector('.chosen-date');
    const weekContainer = document.querySelector('.week');

    const daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    function getStartOfWeek(date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); 
        return new Date(date.setDate(diff));
    }

    function fillWeekDays(baseDate) {
    const startOfWeek = getStartOfWeek(new Date(baseDate));
    const weekDays = weekContainer.querySelectorAll('.week-day');

    weekDays.forEach((dayElement, index) => {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + index);

        const dayNameEl = dayElement.querySelector('.week-day-name');
        const dayDateEl = dayElement.querySelector('.week-date');

        const dayIndex = currentDate.getDay(); 
        dayNameEl.textContent = daysOfWeek[dayIndex]; 

        dayDateEl.textContent = currentDate.getDate();

        dayElement.dataset.date = currentDate.toISOString().split('T')[0];

        dayElement.classList.remove('chosen-day');
        if (currentDate.toDateString() === baseDate.toDateString()) {
            dayElement.classList.add('chosen-day');
        }
    });
}

    function updateChosenDate(date) {
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        chosenDate.textContent = `${dayOfWeek}, ${day} ${month} ${year} года`;
    }

    dateImage.addEventListener('click', () => {
        dateInput.click();
    });

    dateInput.addEventListener('change', () => {
        const selectedDate = new Date(dateInput.value);
        if (!isNaN(selectedDate)) {
            updateChosenDate(selectedDate);
            fillWeekDays(selectedDate);
        }
    });

    weekContainer.addEventListener('click', (event) => {
        const clickedDay = event.target.closest('.week-day');
        if (!clickedDay) return;

        const selectedDateStr = clickedDay.dataset.date;
        const selectedDate = new Date(selectedDateStr);

        if (!isNaN(selectedDate)) {
            dateInput.value = selectedDateStr;

            updateChosenDate(selectedDate);

            weekContainer.querySelectorAll('.week-day').forEach(day => {
                day.classList.remove('chosen-day');
            });
            clickedDay.classList.add('chosen-day');
        }
    });

    const today = new Date();
    updateChosenDate(today);
    fillWeekDays(today);
});