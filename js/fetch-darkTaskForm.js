// Записываем данные с формы событий и отправляем на сервер
//Проверено, работает

const TAGS = getTagsAsArray();

async function fetchUserId() {
    try {
        const response = await fetch('https://flask.stk8s.66bit.ru/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

fetchUserId().then(userId => {
    if (userId) {
        localStorage.setItem('user_id', userId);
        console.log('user_id сохранен в localStorage:', userId);
    } else {
        alert('Не удалось получить user_id. Попробуйте позже.');
    }
});

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
        /*'task_id': null,*/
        'user_id': userId, 
        'task_name': form.querySelector('[name="name-task"]').value,
        'task_description': form.querySelector('[name="desc-task"]').value,
        'task_type': form.querySelector('[name="type-task"]').value,
        'task_tags': TAGS,
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
  method: 'POST', //Тут было POST если что!!!
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
  alert('Данные отправлены! Проверьте консоль.');
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
