const { get_user_id } = require('./get_user_id');

async function main() {
    const user_id = await get_user_id();
    const task = {
        "user_id": user_id,             
        "task_name": "Задача 888689685",      
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
    .then(response => response.json())
    .then(data => console.log('Ответ сервера:', data))
    .catch(error => {
        console.error('Ошибка:', error); 
    });
}

main();
