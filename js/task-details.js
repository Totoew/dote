// Управление тегами задачи
const color = '#FCBC02';
const maxWidth = 300; // Максимальная допустимая ширина тегов
const inputElement = document.getElementById('inputField');

// Обработчик клика по иконке добавления тега
function handleClickOnTagEmblem() {
    const tagEmblem = document.querySelector('.task-tag-emblem');
    const outputElement = document.getElementById('output');

    if (!tagEmblem) {
        console.error('Элемент с классом "task-tag-emblem" не найден');
        return;
    }

    tagEmblem.addEventListener('click', (evt) => {
        evt.preventDefault(); 
        let enteredWord = inputElement.value.trim();

        if (enteredWord !== '') {
            if (getTotalWidth(outputElement) <= maxWidth) {
                addTagWithRemoveOption(outputElement, enteredWord);
                inputElement.value = '';
            } else {
                alert('Всё доступное место занято!');
            }
        }
    });
}

// Функция для вычисления общей ширины всех тегов
function getTotalWidth(container) {
    let totalWidth = 0;
    Array.from(container.children).forEach(child => {
        totalWidth += child.offsetWidth;
    });
    return totalWidth;
}

// Добавление тега с кнопкой удаления
function addTagWithRemoveOption(container, tagText) {
    const wordBlock = document.createElement('div');
    wordBlock.className = 'word-block';
    wordBlock.style.backgroundColor = color;
    wordBlock.textContent = tagText;

    const closeButton = document.createElement('button');
    closeButton.type = 'button'; 
    closeButton.textContent = '✖'; 
    closeButton.style.fontSize = '16px';
    closeButton.style.width = '4px';
    closeButton.style.height = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.marginLeft = "5px";
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';

    closeButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        wordBlock.remove();
    });

    wordBlock.appendChild(closeButton);          
    container.appendChild(wordBlock);
}

// Обновление текста "минут" в зависимости от числа
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

// Обновление стиля приоритета
function updatePriorityStyle(priority) {
    const select = document.getElementById('inputFieldPriority');
    select.classList.remove('not-matter', 'normal', 'matter');
    
    if (priority) {
        select.value = priority;
        select.classList.add(priority);
    }
}

// Получение выбранных тегов из формы
function getSelectedTags() {
    const tagElements = document.querySelectorAll('#output .word-block');
    return Array.from(tagElements).map(el => {
        return el.textContent.replace('✖', '').trim();
    });
}

// Загрузка данных задачи при открытии страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем сохраненные данные задачи
    const taskData = localStorage.getItem('current_task_data');

    if (taskData) {
        const task = JSON.parse(taskData);
        console.log('Загруженные данные задачи:', task); // Для отладки

        // Заполняем основные поля
        document.querySelector('.name-task').value = task.name || '';
        document.querySelector('.desc-task').value = task.description || '';
        document.getElementById('dateInput').value = task.date || '';
        document.querySelector('.task-time').value = task.task_time || '';
        document.querySelector('.time-notification').value = task.notification_time || '1';

        // Обрабатываем приоритет
        if (task.task_priority) {
            updatePriorityStyle(task.task_priority);
        }

        // Обрабатываем теги
        const tagsContainer = document.querySelector('#output');
        if (task.list_tags) {
            // Если теги приходят строкой, разделяем их
            const tagsArray = typeof task.list_tags === 'string' 
                ? task.list_tags.split(',') 
                : task.list_tags;
            
            tagsArray.forEach(tag => {
                if (tag.trim()) {
                    addTagWithRemoveOption(tagsContainer, tag.trim());
                }
            });
        }

        // Обновляем текст "минут"
        updateMinutesLabel(document.querySelector('.time-notification').value);

        // Удаляем данные после использования
        //localStorage.removeItem('current_task_data');
    } else {
        console.error('Данные задачи не найдены в localStorage');
        // Можно перенаправить обратно
        window.location.href = 'index.html';
    }

    // Инициализация обработчиков
    handleClickOnTagEmblem();
    
    // Обработчик изменения количества минут
    document.querySelector('.time-notification').addEventListener('change', function() {
        updateMinutesLabel(this.value);
    });

    // Обработчик изменения приоритета
    document.getElementById('inputFieldPriority').addEventListener('change', function() {
        updatePriorityStyle(this.value);
    });
});

// Обработчик кнопки "Назад"
document.getElementById('backButton').addEventListener('click', () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html'; 
    }
});

// Обработчик отправки формы
document.getElementById('darkTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const updatedTask = {
        name: document.querySelector('.name-task').value,
        description: document.querySelector('.desc-task').value,
        task_priority: document.getElementById('inputFieldPriority').value,
        date: document.getElementById('dateInput').value,
        task_time: document.querySelector('.task-time').value,
        notification_time: document.querySelector('.time-notification').value,
        list_tags: getSelectedTags()
    };
    
    console.log('Обновленные данные задачи:', updatedTask);
    // Здесь должен быть код для сохранения изменений на сервере
    // saveTaskChanges(updatedTask);
    
    // Временно просто перенаправляем обратно
});

// Блокировка свайпа вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
