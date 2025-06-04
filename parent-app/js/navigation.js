const chosenDate = document.querySelector('.chosen-date');
const weekDays = document.querySelectorAll('.week-date');
const dateButton = document.querySelector('.date-button');
let chosenDay = document.querySelector('.chosen-day');
const dateInput = document.querySelector('.date-input');

const drawHeader = () => {
    const currentDate = chosenDate.textContent === '' ? new Date() : new Date(dateInput.value);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = currentDate.toLocaleDateString('ru-RU', options);

    const cleanedDate = formattedDate.replace(/\sг\.$/, ''); 
    const capitalizedDate = cleanedDate.charAt(0).toUpperCase() + cleanedDate.slice(1);

    chosenDate.textContent = capitalizedDate;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    
    const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    dateInput.value = dateString;
};

const drawWeek = () => {
    const currentDate = new Date(dateInput.value);
    
    const currentDay = (currentDate.getDay() === 0) ? 6 : currentDate.getDay() - 1;;

    const currentDateNumber = currentDate.getDate();

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDateNumber - currentDay + i);
        weekDays[i].textContent = date.getDate();

        if (i === currentDay) {
            chosenDay.classList.remove('chosen-day');
            weekDays[i].parentElement.classList.add('chosen-day');
            chosenDay = weekDays[i].parentElement;
        }
    }
};

drawHeader();
drawWeek();

dateButton.addEventListener('click', () => {
    dateInput.showPicker?.();
});

dateButton.addEventListener('change', (evt) => {
    dateInput.value = evt.target.value;
    drawHeader();
    drawWeek();
});
