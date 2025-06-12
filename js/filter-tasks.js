document.addEventListener('DOMContentLoaded', () => {
    function sortTasks() {
        // Выбираем все задачи, включая те, что вне контейнера
        const taskCards = Array.from(document.querySelectorAll('.task-card'));
        if (taskCards.length === 0) {
            console.error('Задачи не найдены.');
            return;
        }

        // Определение порядка приоритетов
        const priorityOrder = {
            'Важно': 1,
            'Нормально': 2,
            'Не важно': 3,
        };

        // Сортировка задач
        taskCards.sort((a, b) => {
            const priorityA = priorityOrder[a.querySelector('.priority-element')?.textContent.trim()] || 4;
            const priorityB = priorityOrder[b.querySelector('.priority-element')?.textContent.trim()] || 4;

            if (priorityA !== priorityB) {
                return priorityA - priorityB; // Сравниваем приоритеты
            }

            const deadlineA = a.querySelector('.deadline')?.textContent.trim();
            const deadlineB = b.querySelector('.deadline')?.textContent.trim();

            // Если у одной из задач нет дедлайна
            if (!deadlineA && deadlineB) return 1;
            if (!deadlineB && deadlineA) return -1;

            // Сравниваем дедлайны
            return new Date(deadlineA) - new Date(deadlineB);
        });

        // Обновление DOM: удаляем старые карточки и добавляем отсортированные
        const parentContainer = document.querySelector('.tasks-container') || document.querySelector('.scroll-box');
        if (!parentContainer) {
            console.error('Контейнер для задач не найден.');
            return;
        }

        // Очищаем старый список
        parentContainer.innerHTML = '';
        taskCards.forEach(task => parentContainer.appendChild(task));
    }

    // Запускаем сортировку
    sortTasks();
});

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
