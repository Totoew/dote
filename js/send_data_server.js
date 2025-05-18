console.log("Файл подключен и работает!");

//1. Данные для отправки (как вы указали)
const taskData = {
  user_id: 965696687,
  event_name: "Название 52",
  event_description: "Описание 52",
  event_type: "task",
  event_date: "2025-04-27",
  event_time_first: "01:00",
  event_time_second: "10:00",
  event_notification_time: "5",
  event_status: "pending"
};

// const eventData = {
//     task_id: null,              
//     user_id: 965696687,             
//     task_name: "А вот так???",      
//     task_description: "Описание задачи", 
//     task_type: "task",          
//     task_tags: ["tag1ghcgfhgff", "tag2"], 
//     task_priority: "matter",   

//     task_date: "2024-12-31",  
//     task_notification_time: "30",
//     task_status: "pending",
//     task_time: "08:00",   
// }

// 2. Отправка на сервер
fetch('https://flask.stk8s.66bit.ru/events', {
  method: 'POST', //Тут было POST если че!!!
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