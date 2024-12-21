//создаем функцию для генерации айдишника
async function get_user_id() {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка при получении user_id:', error);
        return null;
    }
}

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

const tags = getTagsAsArray();
let taskMOC = {};

document.getElementById('darkTaskForm').addEventListener('submit', async function (evt) {
    evt.preventDefault();

    const userId = await get_user_id();
    console.log("вот наш юзер-ид:  ", userId);

    // Проверка: если userId не получен
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
        'task_tags': tags,
        'task_priority': form.querySelector('[name="priority-level"]').value,
        'task_date': form.querySelector('[name="day-task"]').value,
        'task_notification_time': Number(form.querySelector('[name="time-notification"]').value),
        'task_status': "pending",
    };

    console.log("Отправляем задачу:", task);

    const jsonData = JSON.stringify(task);
    await getTaskData(jsonData);
});

async function getTaskData(jsonData) {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Ответ сервера:', data);

        // Логируем данные для сохранения в Local Storage
        if (data && data.task) {
            console.log('Данные task для сохранения:', data.task);
            localStorage.setItem(`task_${data.task.task_id}`, JSON.stringify(data.task));
        } else {
            console.error('Отсутствуют данные task для сохранения');
        }

        alert('Форма успешно отправлена!');
    } catch (error) {
        console.error('Ошибка при отправке задачи:', error);
        alert('Произошла ошибка при отправке формы.');
    }
}
/****************************************************************************************************** */
//моковые данные, которые должны прийти 
//с сервера в виде json. Допустим, я их преобазовал в js-объект
/*taskMOC = {
    task_id: null,              
    user_id: 965696687,             
    task_name: "Задача 1",      
    task_description: "Описание задачи", 
    task_type: "task",          
    task_tags: ["tag1ghcgfhgff", "tag2"], 
    task_priority: "matter",   
    task_date: "2024-12-31",  
    task_notification_time: "30",
    task_status: "pending"     
};*/
