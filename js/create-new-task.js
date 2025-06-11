const color = '#FCBC02';
const maxWidth = 300; // Максимальная допустимая ширина 
const inputElement = document.getElementById('inputField');

function handleClickOnBbb() {
    const bbbElement = document.querySelector('.task-tag-emblem');
    const outputElement = document.getElementById('output');
    const maxWidth = 300; // Укажите максимальную ширину, если нужно

    if (!bbbElement) {
        console.error('Элемент с классом "bbb" не найден');
        return;
    }

    bbbElement.addEventListener('click', (evt) => {
        evt.preventDefault(); 

        let enteredWord = inputElement.value.trim();

        if (enteredWord !== '') {
            if (getTotalWidth(outputElement) <= maxWidth) {
                let wordBlock = document.createElement('div');
                wordBlock.className = 'word-block';
                wordBlock.style.backgroundColor = color;
                wordBlock.textContent = enteredWord;

                let plusButton = document.createElement('close-button');
                plusButton.type = 'button'; 
                plusButton.textContent = '✖'; 

                plusButton.style.fontSize = '16px';
                plusButton.style.width = '4px';
                plusButton.style.height = '4px';
                plusButton.style.cursor = 'pointer';
                plusButton.style.marginLeft = "5px";

                plusButton.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    wordBlock.remove();
                });

                wordBlock.appendChild(plusButton);          
                outputElement.appendChild(wordBlock);

                inputElement.value = '';
            } else {
                alert('Всё доступное место занято!');
            }
        }
    });
}

// Вызов функции для добавления обработчика
handleClickOnBbb();

// Функция для вычисления общей ширины всех блоков внутри контейнера
function getTotalWidth(container) {
    let totalWidth = 0;
    Array.from(container.children).forEach(child => {
    totalWidth += child.offsetWidth;
    });
    return totalWidth;
}

function replaceWithFormattedDate() {
    const input = document.getElementById('dateInput');
    const dateValue = new Date(input.value);

    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    if (!isNaN(dateValue)) {
        const day = dateValue.getDate();
        const monthIndex = dateValue.getMonth();

        const formattedDate = `${day} ${months[monthIndex]}`;

        const span = document.createElement('span');
        span.className = 'date-span';
        span.innerText = formattedDate;
        span.value = formattedDate;

        // Удаляем input и вставляем span на его место
        const container = document.getElementById('dateContainer');
        container.removeChild(input);
        container.appendChild(span);
    }
}

function updateMinutesLabel(value) {
    const minutesLabel = document.getElementById('minutes-label');
    
    const numberValue = parseInt(value);
    
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

//функция для отображения приоритетов
document.getElementById('inputFieldPriority').addEventListener('change', function () {
    const select = this;

    select.classList.remove('not-matter', 'normal', 'matter');

    if (select.value === 'not-matter') {
        select.classList.add('not-matter');
    } else if (select.value === 'normal') {
        select.classList.add('normal');
    } else if (select.value === 'matter') {
        select.classList.add('matter');
    }
});

document.getElementById("inputFieldPriority").addEventListener("change", function () {
    if (this.value !== "") {
        // Если выбрана любая другая опция, кроме "Выберите..."
        this.querySelectorAll("option")[0].style.display = "none"; 
    } else {
        this.options[0].style.display = ""; 
    }
});

//вернуться обратно
document.getElementById('backButton').addEventListener('click', () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'create-new.html'; 
    }
});

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });

function validateDateTime() {
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.querySelector('.task-time');
    const errorDate = document.getElementById('date-error');
    const errorDateTime = document.getElementById('datetime-error');

    errorDate.style.display = 'none';
    errorDateTime.style.display = 'none';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (!dateInput.value) {
        errorDate.style.display = 'block';
        errorDate.textContent = '';
        showToast("Выберите дату");
        return false;
    }

    const selectedDate = new Date(dateInput.value);

    if (selectedDate < today) {
        errorDate.style.display = 'block';
        errorDate.textContent = '';
        showToast("Нельзя выбрать дату в прошлом");
        return false;
    }

    if (timeInput.value) {
        const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(timeInput.value)) {
            errorDateTime.style.display = 'block';
            errorDateTime.textContent = 'Некорректный формат времени';
            showToast("Неверный формат времени");
            return false;
        }

        if (selectedDate.getTime() === today.getTime()) {
            const [hours, minutes] = timeInput.value.split(':').map(Number);
            const selectedTime = new Date();
            selectedTime.setHours(hours, minutes, 0, 0);

            if (selectedTime < now) {
                showToast("Нельзя выбрать время в прошлом");
                return;
            }
        }
    }
    return true; 
}

document.getElementById('darkTaskForm').addEventListener('submit', function(e) {
    if (!validateDateTime()) {
        e.preventDefault();
        return;
    } 
});

document.getElementById('darkTaskForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    if (!isDateTimeValid()) {
        return;
    }

    console.log("Форма прошла валидацию");
    this.submit(); 
});

document.getElementById('darkTaskForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 1000);
}
