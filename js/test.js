// // Получение всех ключей из localStorage
// const taskKeys = Object.keys(localStorage);
// console.log(taskKeys);
// // Объединение задач, если их несколько
// const tasks = taskKeys.map(key => {
//     const taskData = localStorage.getItem(key);
//     console.log(taskData, key);
//     if (key.includes('task') || key.includes('event')) {
//         return JSON.parse(taskData);
//     }
    
// }).filter(task => task !== null);

// console.log('Загруженные задачи из Local Storage:', tasks);

// // Заполнение шаблона для каждой задачи
// tasks.forEach(taskMOC => {
//     fillTaskTemplate(taskMOC);
// });

// function fillTaskTemplate(taskMOC) {
//     if (!taskMOC) {
//         console.error('Невозможно заполнить шаблон: данные задачи отсутствуют.');
//         return;
//     }

//     const template = document.querySelector('#taskCardTemplate');
//     if (!template) {
//         console.error('Шаблон не найден');
//         return;
//     }

//     const taskCard = template.content.cloneNode(true);

//     // Генерируем уникальный task_id и добавляем к карточке
//     const taskId = taskMOC.task_id;
//     console.log("Айдишник таски равен: ", taskId)
//     taskCard.querySelector('.task-card').setAttribute('data-task-id', taskId);

//     // Заполняем карточку данными
//     taskCard.querySelector('.name-task').textContent = taskMOC.task_name || 'No task name';
//     const tagsContainer = taskCard.querySelector('.list-tags');

//     if (taskMOC.task_tags && taskMOC.task_tags.length > 0) {
//         taskMOC.task_tags.forEach(tag => {
//             const tagElement = document.createElement('span');
//             tagElement.className = 'list-tags-item';
//             tagElement.textContent = tag;
//             tagsContainer.appendChild(tagElement);
//         });
//     } else {
//         const defaultTagElement = document.createElement('span');
//         defaultTagElement.className = 'list-tags-item';
//         defaultTagElement.textContent = 'No tags';
//         tagsContainer.appendChild(defaultTagElement);
//     }

//     const priorityElement = document.createElement('span');
//     priorityElement.className = 'priority-element';
//     priorityElement.style.fontSize = '12px';
//     priorityElement.style.padding = '0 6px';
//     priorityElement.style.lineHeight = '20px';
//     priorityElement.style.whiteSpace = 'nowrap';
//     priorityElement.style.height = '20px';
//     priorityElement.style.boxSizing = 'border-box';
//     priorityElement.style.borderRadius = '32px';
//     priorityElement.style.textAlign = 'center';
//     priorityElement.style.marginRight = '0px';

//     switch (taskMOC.task_priority) {
//         case 'normal':
//             priorityElement.textContent = 'Нормально';
//             priorityElement.style.backgroundColor = 'green';
//             priorityElement.style.color = 'black';
//             break;
//         case 'not-matter':
//             priorityElement.textContent = 'Не важно';
//             priorityElement.style.backgroundColor = 'gray';
//             priorityElement.style.color = 'black';
//             break;
//         case 'matter':
//             priorityElement.textContent = 'Важно';
//             priorityElement.style.backgroundColor = 'red';
//             priorityElement.style.color = 'black';
//             break;
//         default:
//             priorityElement.textContent = 'Не указано';
//             priorityElement.style.backgroundColor = '#d4d4d4';
//             priorityElement.style.color = 'black';
//             break;
//     }

//     tagsContainer.prepend(priorityElement);

//     // Устанавливаем дату по умолчанию, если она не указана
//     const deadlineElement = taskCard.querySelector('.deadline');
//     deadlineElement.className = 'margin-deadline';
//     deadlineElement.textContent = taskMOC.task_date || 'No date';

//     // Обработчик клика по карточке
//     const cardElement = taskCard.querySelector('.main-block');
//     cardElement.addEventListener('click', () => {
//         // Сохраняем данные задачи в localStorage для передачи между страницами
//         localStorage.setItem('currentTask', JSON.stringify(taskMOC));
//         window.location.href = 'task-details.html';
//     });

//     // Получаем контейнер для задач
//     const tasksContainer = document.querySelector('.tasks-container');
//     if (tasksContainer) {
//         console.log('Добавляем задачу в контейнер');
//         // Добавляем карточку в контейнер
//         tasksContainer.appendChild(taskCard);
//     } else {
//         console.error('Контейнер для задач не найден');
//     }
// }

// function addDeleteEventToExistingCards() {
//     // Добавляем обработчик события на кнопки удаления
//     document.querySelectorAll('.delete').forEach(deleteButton => {
//         deleteButton.addEventListener('click', (event) => {
//             const deleteWindow = document.getElementById('delete-window-id');
//             if (deleteWindow) {
//                 // Показываем окно подтверждения удаления
//                 deleteWindow.classList.remove('hidden');

//                 // Получаем карточку задачи, которую нужно удалить
//                 const taskCard = event.target.closest('.task-card');
//                 if (taskCard) {
//                     deleteWindow.setAttribute('data-task-id', taskCard.getAttribute('data-task-id'));
//                 }
//             }
//         });
//     });

//     const confirmTrueButton = document.querySelector('.confirm-true');
//     if (confirmTrueButton) {
//         confirmTrueButton.addEventListener('click', () => {
//             const deleteWindow = document.getElementById('delete-window-id');
//             if (deleteWindow) {
//                 const taskId = deleteWindow.getAttribute('data-task-id');
//                 if (taskId) {
//                     // Удаляем карточку задачи из DOM
//                     const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
//                     if (taskCard) {
//                         taskCard.remove();
//                     }

//                     // Удаляем задачу из localStorage
//                     const taskKeys = Object.keys(localStorage);
//                     taskKeys.forEach(key => {
//                         const taskData = JSON.parse(localStorage.getItem(key));
//                         if (taskData && taskData.task_id === taskId) {
//                             localStorage.removeItem(key); // Удаляем задачу
//                             console.log(`Удалено из localStorage: ключ ${key}`);
//                         }
//                     });

//                     console.log(`Задача с ID ${taskId} удалена из localStorage и DOM.`);

//                     // Скрываем окно подтверждения удаления
//                     deleteWindow.classList.add('hidden');
//                 }
//             }
//         });
//     }

//     const confirmFalseButton = document.querySelector('.confirm-false');
//     if (confirmFalseButton) {
//         confirmFalseButton.addEventListener('click', () => {
//             const deleteWindow = document.getElementById('delete-window-id');
//             if (deleteWindow) {
//                 deleteWindow.classList.add('hidden');
//             }
//         });
//     }
// }

// // Вызов функции для добавления событий на кнопки удаления
// addDeleteEventToExistingCards();

// // Отключаем свайп вниз на уровне документа
// document.addEventListener('touchmove', function (event) {
//     if (event.touches && event.touches[0].clientY > 0) {
//         event.preventDefault();
//     }
// }, { passive: false });

// // Разрешаем скролл внутри контейнера .scroll-box
// const scrollBox = document.querySelector('.list-tasks');
// scrollBox.addEventListener('touchmove', function (event) {
//     event.stopPropagation();
// }, { passive: true });