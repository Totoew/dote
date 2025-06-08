// Записываем данные с формы событий и отправляем на сервер
//Проверено, работает

function fetchUserId() {
    try {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const user_id = Number(params.get('id'));
            
        localStorage.setItem('user_id', user_id);
        return user_id;
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

fetchUserId();

//функция для преобразования тегов в массив слов
//не работает она
function getTagsAsArray() {
    const tagsContainer = document.getElementById('output');
    if (!tagsContainer) {
        console.error('Контейнер для тегов не найден');
        return [];
    }

    const tags = [];
    tagsContainer.querySelectorAll('.word-block').forEach(tagElement => {
        console.log(tagElement);
        tags.push(tagElement.textContent.replace('✖', '').trim());
    });

    return tags;
}

document.getElementById('darkTaskForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    const userId = localStorage.getItem('user_id');
    console.log("Вот наш юзер-ид:  ", userId);

    if (!userId) {
        console.error("Не удалось получить user_id.");
        alert("Ошибка: не удалось получить идентификатор пользователя.");
        return;
    }

    const form = evt.target;

    const task = {
        'user_id': userId, 
        'task_name': form.querySelector('[name="name-task"]').value,
        'task_description': form.querySelector('[name="desc-task"]').value,
        'task_type': form.querySelector('[name="type-task"]').value,
        'task_tags': getTagsAsArray(),
        'task_priority': form.querySelector('[name="priority-level"]').value,
        'task_date': form.querySelector('[name="day-task"]').value,
        'task_notification_time': Number(form.querySelector('[name="time-notification"]').value),
        'task_status': "pending",
        'task_time': form.querySelector('[name="task-time"]').value,
    };
    console.log("Значение поля ввода для времени", form.querySelector('[name="task-time"]').value)
    console.log("Отправляем задачу:", task);
    getTaskData(task);
});

async function getTaskData(taskData) {
    fetch('https://flask.stk8s.66bit.ru/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(taskData),
})
.then(response => {
  if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
  return response.json();
})
.then(data => {
  console.log('Успех:', data);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const user_id = Number(params.get('id'));
  window.location.href = `index.html?id=${user_id}`;
})
.catch(error => {
  console.error('Ошибка:', error);
  alert('Ошибка отправки: ' + error.message);
});
}

//Не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (task) {
    if (task.touches && task.touches[0].clientY > 0) {
        task.preventDefault();
    }
}, { passive: false });
