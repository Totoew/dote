const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const tasksContainer = document.querySelector('.scroll-box');

// Функция фильтрации и отображения задач на основе поискового запроса
function searchTasks(query) {
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(task => {
        const taskName = task.querySelector('.name-task').textContent.toLowerCase();
        const words = taskName.split(/\s+/); 
        const matches = words.some(word => word.startsWith(query.toLowerCase())); 
        if (matches) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Слушатель событий для переключения видимости ввода поиска
searchButton.addEventListener('click', () => {
    if (searchInput.style.display === 'none') {
        searchInput.style.display = 'block'; 
        searchInput.focus();
    } else {
        searchInput.style.display = 'none'; 
        searchInput.value = ''; 
        searchTasks('');
    }
});

// Слушатель событий для получения входных данных и запуска поиска
searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    searchTasks(query);
});