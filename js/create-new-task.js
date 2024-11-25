let colors = '#FCBC02';
let currentColorIndex = 0;
const maxWidth = 300; // Максимальная допустимая ширина в пикселях

function handleKeyUp(event) {
              if (event.keyCode === 13) {
                  event.preventDefault(); // Отменяем стандартное действие (отправку формы)
                  
                  const inputElement = document.getElementById('inputField');
                  const outputElement = document.getElementById('output');
                  
                  let enteredWord = inputElement.value.trim();
                  
                  if (enteredWord !== '' && getTotalWidth(outputElement) <= maxWidth) {
                      // Создаем новый div для слова
                      let wordBlock = document.createElement('div');
                      wordBlock.className = 'word-block';
                      wordBlock.style.backgroundColor = colors;
                      wordBlock.textContent = enteredWord;
                      
                      // Добавляем созданный блок в контейнер
                      outputElement.appendChild(wordBlock);
                      
                      // Сбрасываем значение поля ввода
                      inputElement.value = '';
                      
                      // Переходим к следующему цвету
                      currentColorIndex++;  
                  }
              }
          }

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