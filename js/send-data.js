form = document.querySelector('.create-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();  // Отменить стандартное поведение формы

    const formData = new FormData(this);

    fetch('/addtask', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Обработка успешного ответа
        console.log(data);
        alert('Задача успешно добавлена!');
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при добавлении задачи.');
    });
});



let userId = null;

async function initApp() {
    try {
        const response = await fetch('http://localhost:5000/get_user_id');
        if (!response.ok) {
            throw new Error('Ошибка при получении ID пользователя');
        }
        const data = await response.json();
        userId = data.user_id; // Сохраняем ID пользователя
        console.log('ID пользователя:', userId);
    } catch (error) {
        console.error(error);
    }
}

// Вызов initApp при загрузке страницы
window.onload = initApp;



// Замените 1 на нужный вам user_id
userId = 1;

fetch(`http://localhost:5000/tasks/${userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Задачи:', data.tasks);
        // Здесь вы можете обработать данные, например, отобразить их на странице
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });

