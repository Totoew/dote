//тестовый файл для попытки отправки данных на сервер 
const task = {
    "user_id": 965696687,             
    "task_name": "Задача 1",      
    "task_description": "Описание задачи", 
    "task_type": "task",          
    "task_tags": ["tag1", "tag2"],
    "task_priority": "matter",   
    "task_date": "2024-12-31",  
    "task_notification_time": 30,
    "task_status": "pending"   
};

const jsonData = JSON.stringify(task);

fetch('https://laert.pythonanywhere.com/tasks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: jsonData,
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.statusText}`);
    }
    return response.json(); 
})
.then(data => {
    console.log('Ответ сервера:', data); 
})
.catch(error => {
    console.error('Ошибка:', error); 
});