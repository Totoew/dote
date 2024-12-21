/*const eventData = localStorage.getItem('event_data'); // Получаем данные события из localStorage
const template = document.getElementById('EventCardTemplate'); // Шаблон
const container = document.querySelector('.container'); // Контейнер, куда добавляются элементы

if (eventData) {
    const event = JSON.parse(eventData); 
    console.log('Айдишник события:', event.event_id);
    //размещение события в календаре событий
    const startTime = event.event_time_first; 
    const endTime = event.event_time_second; 
    console.log(`Начальное время: ${startTime}, Конечное время: ${endTime}`);
    let intBeginningStartTime = Number(startTime.slice(0, 2));
    let intEndStartTime = Number(startTime.slice(3, 5));
    let intBeginningFinishTime = Number(endTime.slice(0, 2));
    let intEndFinishTime = Number(endTime.slice(3, 5));
    let marginTop = 78*intBeginningStartTime + Math.round(intEndStartTime/60)*78
    let heightEventCard = calculateHeightEventCard(intBeginningFinishTime, intEndFinishTime, intBeginningStartTime, intEndStartTime);

    // Создаем копию содержимого шаблона
    const templateContent = template.content.cloneNode(true);

    // Наполняем элемент данными события
    const eventBlock = templateContent.querySelector('.event-in-calendar');
    const eventNameElement = templateContent.querySelector('.event-name');
    eventNameElement.textContent = `${event.event_name}`; // Устанавливаем название события

    // Храним дополнительные данные в атрибутах data-*
    const articleElement = templateContent.querySelector('.empty-blocks-elem');
    articleElement.dataset.eventId = event.event_id;
    articleElement.dataset.userId = event.user_id;
    articleElement.dataset.description = event.event_description;
    articleElement.dataset.type = event.event_type;
    articleElement.dataset.notificationTime = event.event_notification_time;
    articleElement.dataset.status = event.event_status;

    // Добавляем обработчик клика на всю карточку
    articleElement.addEventListener('click', () => {
        // Сохраняем данные события в localStorage для страницы редактирования
        localStorage.setItem('current_event_data', JSON.stringify(event));
        // Перенаправляем на страницу редактирования
        window.location.href = 'event-details.html';
    });

    // Настраиваем кнопку
    const button = templateContent.querySelector('.icon-button');
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы предотвратить срабатывание события клика на карточке
        /*alert(`Вы нажали на кнопку события с ID: ${event.event_id}`);*/
    /* });

    // Добавляем копию шаблона в контейнер
    container.appendChild(templateContent);
} else {
    console.error('Данные события отсутствуют в localStorage.');
}

function calculateHeightEventCard(one, two, three, four){
    let calculatedHeight =  (((one + two/60) - (three + four/60))*78).toFixed(1);
    if (calculatedHeight < 12){
        return 12;
    } else {
        return calculatedHeight;
    }
}

function addDeleteEventToExistingCards() {
    // Добавляем обработчик события на кнопки удаления
    document.querySelectorAll('.icon-button').forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                // Показываем окно подтверждения удаления
                deleteWindow.classList.remove('hidden');

                // Получаем карточку задачи, которую нужно удалить
                const taskCard = event.target.closest('.event-in-calendar');
                if (taskCard) {
                    deleteWindow.setAttribute('data-event-id', taskCard.getAttribute('data-event-id'));
                }
            }
        });
    });

    const confirmTrueButton = document.querySelector('.confirm-true');
    if (confirmTrueButton) {
        confirmTrueButton.addEventListener('click', () => {
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                const taskId = deleteWindow.getAttribute('data-event-id');
                if (taskId) {
                    const taskCard = document.querySelector(`.event-in-calendar[data-event-id="${taskId}"]`);
                    if (taskCard) {
                        taskCard.remove();
                    }

                    let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
                    if (!deletedTasks.includes(taskId)) {
                        deletedTasks.push(taskId);
                        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                    }

                    deleteWindow.classList.add('hidden');
                }
            }
        });
    }

    const confirmFalseButton = document.querySelector('.confirm-false');
    if (confirmFalseButton) {
        confirmFalseButton.addEventListener('click', () => {
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                deleteWindow.classList.add('hidden');
            }
        });
    }
}

addDeleteEventToExistingCards();*/

const eventData = localStorage.getItem('event_data'); // Получаем данные события из localStorage
const template = document.getElementById('EventCardTemplate'); // Шаблон
const container = document.querySelector('.container'); // Контейнер для событий

if (container) {
    container.style.position = 'relative';
}

if (eventData) {
    const event = JSON.parse(eventData);
    console.log('Айдишник события:', event.event_id);

    // Время начала и окончания события
    const startTime = event.event_time_first;
    const endTime = event.event_time_second;
    console.log(`Начальное время: ${startTime}, Конечное время: ${endTime}`);
    const intBeginningStartTime = Number(startTime.slice(0, 2));
    const intEndStartTime = Number(startTime.slice(3, 5));
    const intBeginningFinishTime = Number(endTime.slice(0, 2));
    const intEndFinishTime = Number(endTime.slice(3, 5));

    const topPosition = 78 * intBeginningStartTime + Math.round((intEndStartTime / 60) * 78);
    const heightEventCard = calculateHeightEventCard(
        intBeginningFinishTime,
        intEndFinishTime,
        intBeginningStartTime,
        intEndStartTime
    );

    // Создаем копию содержимого шаблона
    const templateContent = template.content.cloneNode(true);

    // Наполняем элемент данными события
    const eventBlock = templateContent.querySelector('.event-in-calendar');
    const eventNameElement = templateContent.querySelector('.event-name');
    eventNameElement.textContent = `${event.event_name}`;

    // Храним дополнительные данные в атрибутах data-*
    const articleElement = templateContent.querySelector('.event-in-calendar');
    articleElement.dataset.eventId = event.event_id;
    articleElement.dataset.userId = event.user_id;
    articleElement.dataset.description = event.event_description;
    articleElement.dataset.type = event.event_type;
    articleElement.dataset.notificationTime = event.event_notification_time;
    articleElement.dataset.status = event.event_status;
    articleElement.dataset.date = event.event_date;

    // Добавляем обработчик клика на всю карточку
    articleElement.addEventListener('click', () => {
        localStorage.setItem('current_event_data', JSON.stringify(event));
        window.location.href = 'event-details.html';
    });

    // Настраиваем кнопку
    const button = templateContent.querySelector('.icon-button');
    button.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Устанавливаем стили для абсолютного позиционирования
    articleElement.style.position = 'absolute';
    articleElement.style.top = `${topPosition}px`;
    articleElement.style.height = `${heightEventCard}px`;
    articleElement.style.left = '0'; // Если требуется выравнивание по левому краю
    articleElement.style.right = '0'; // Или можно настроить ширину
    articleElement.style.zIndex = 10; // Высокий z-index для отображения поверх

    // Добавляем карточку в контейнер
    container.appendChild(templateContent);
} else {
    console.error('Данные события отсутствуют в localStorage.');
}

function calculateHeightEventCard(one, two, three, four) {
    if(one > three || one == three && two > four){
        const calculatedHeight = (((one + two / 60) - (three + four / 60)) * 78).toFixed(1);
        return calculatedHeight < 12 ? 12 : calculatedHeight;
    } else{
        return 78*(24 - (three + four / 60));
    }
}

function addDeleteEventToExistingCards() {
    document.querySelectorAll('.icon-button').forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                deleteWindow.classList.remove('hidden');
                const taskCard = event.target.closest('.event-in-calendar');
                if (taskCard) {
                    deleteWindow.setAttribute('data-event-id', taskCard.getAttribute('data-event-id'));
                }
            }
        });
    });

    const confirmTrueButton = document.querySelector('.confirm-true');
    if (confirmTrueButton) {
        confirmTrueButton.addEventListener('click', () => {
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                const taskId = deleteWindow.getAttribute('data-event-id');
                if (taskId) {
                    const taskCard = document.querySelector(`.event-in-calendar[data-event-id="${taskId}"]`);
                    if (taskCard) {
                        taskCard.remove();
                    }

                    const deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
                    if (!deletedTasks.includes(taskId)) {
                        deletedTasks.push(taskId);
                        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
                    }

                    deleteWindow.classList.add('hidden');
                }
            }
        });
    }

    const confirmFalseButton = document.querySelector('.confirm-false');
    if (confirmFalseButton) {
        confirmFalseButton.addEventListener('click', () => {
            const deleteWindow = document.getElementById('delete-window-id');
            if (deleteWindow) {
                deleteWindow.classList.add('hidden');
            }
        });
    }
}

addDeleteEventToExistingCards();

