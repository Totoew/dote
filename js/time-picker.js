const popup = document.getElementById('popup-time');
const overlay = document.getElementById('overlay');
const start_event = document.querySelector('.start-event-time');
const finish_event = document.querySelector('.finish-event-time');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const min = 0;
const maxHours = 24;
const maxMinutes = 60;
let flag = 'start';
let currentHoursValue = NaN;
let currentMinutesValue = NaN;



function initializeValues() {
    if (flag == 'start') {
        const value = start_event.value.split(':')
        currentHoursValue = isNaN(value[0]) ? 0 : Number(value[0]);
        currentMinutesValue = isNaN(value[1]) ? 0 : Number(value[1]);
    } else if (flag == 'finish') {
        const value = finish_event.value.split(':')
        currentHoursValue = isNaN(value[0]) ? 0 : Number(value[0]);
        currentMinutesValue = isNaN(value[1]) ? 0 : Number(value[1]);
    }
    updateDisplay('hours');
    updateDisplay('minutes');
}

function updateDisplay(time) {
    let prevValue;
    let nextValue;
    const currentValue = document.getElementById(`${time}-current-value`);

    if (time == 'hours') {
        prevValue = modifyTime((currentHoursValue - 1 + maxHours) % maxHours);
        nextValue = modifyTime((currentHoursValue + 1) % maxHours);
        currentValue.textContent = modifyTime(currentHoursValue);
    } else {
        prevValue = modifyTime((currentMinutesValue - 1 + maxMinutes) % maxMinutes);
        nextValue = modifyTime((currentMinutesValue + 1) % maxMinutes);
        currentValue.textContent = modifyTime(currentMinutesValue);
    }
    
    document.getElementById(`${time}-prev-value`).textContent = prevValue;
    document.getElementById(`${time}-next-value`).textContent = nextValue;
}

function modifyTime(time) {
    if (time < 10) {
        time = '0' + String(time);
    }
    return time
}

function scrollValues(evt) {
    evt.preventDefault();
    const time = evt.target.id.split('-')[0];
    const delta = Math.sign(evt.deltaY);
    if (time == 'hours') {
        currentHoursValue = (currentHoursValue + delta + maxHours) % maxHours;
    } else {
        currentMinutesValue = (currentMinutesValue + delta + maxMinutes) % maxMinutes; 
    }
    updateDisplay(time);
}

function startTouch() {
    const rect = popup.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    startY = centerY;
}

function moveTouch(evt) {
    const touchY = evt.touches[0].clientY;
    const delta = touchY - startY;
    if (Math.abs(delta) > 30) {
        currentValue = (currentValue + (delta > 0 ? -1 : 1) + totalValues) % totalValues;
        updateDisplay();
        //startY = touchY;
    }
}



hours.addEventListener('wheel', scrollValues);
hours.addEventListener('touchstart', startTouch);
hours.addEventListener('touchmove', moveTouch);

minutes.addEventListener('wheel', scrollValues);
minutes.addEventListener('touchstart', startTouch);
minutes.addEventListener('touchmove', moveTouch);


start_event.addEventListener('click', () => {
    flag = 'start';
    togglePopup();
});

finish_event.addEventListener('click', () => {
    flag = 'finish';
    togglePopup();
});

function togglePopup() {
    const isVisible = popup.style.display === 'flex';
    popup.style.display = isVisible ? 'none' : 'flex';
    overlay.style.display = isVisible ? 'none' : 'flex';
    initializeValues();
}

function closePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

document.querySelector('.popup-cancel').addEventListener('click', closePopup);

document.querySelector('.popup-save').addEventListener('click', () => {
    if (flag == 'start') {
        start_event.value = `${modifyTime(currentHoursValue)}:${modifyTime(currentMinutesValue)}`;
    } else {
        finish_event.value = `${modifyTime(currentHoursValue)}:${modifyTime(currentMinutesValue)}`;
    }
    closePopup();
});