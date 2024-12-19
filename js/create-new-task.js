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
