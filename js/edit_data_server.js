
async function updateTask(event_id, updateData) {
  // const payload = {
  //   task_id: task_id,
  //   user_id: 965696687, 
  //   task_name: updateData.task_name || "Задача по умолчанию",
  //   task_description: updateData.task_description || "",
  //   task_type: updateData.task_type || "task",
  //   task_tags: updateData.task_tags || [],
  //   task_priority: updateData.task_priority || "normal",
  //   task_date: updateData.task_date || new Date().toISOString().split('T')[0],
  //   task_notification_time: updateData.task_notification_time || "1",
  //   task_status: updateData.task_status || "pending",
  //   task_time: updateData.task_time || "00:00"
  // };

  const payload = {
    event_id: event_id,
    user_id: 965696687, 
    event_name: updateData.task_name || "Задача по умолчанию",
    event_description: updateData.task_description || "",
    event_type: updateData.task_type || "task",
    event_time_first: updateData.event_time_first || "10:00",
    event_time_second: updateData.event_time_second || "11:00",
    event_date: updateData.task_date || new Date().toISOString().split('T')[0],
    event_notification_time: updateData.task_notification_time || "1",
    event_status: updateData.task_status || "pending",
  };

// const eventData = {
//   user_id: 965696687,
//   event_name: "Егор, ты видишь это?",
//   event_description: "Есть контакт?",
//   event_type: "task",
//   event_date: "2025-04-27",
//   event_time_first: "01:00",
//   event_time_second: "10:00",
//   event_notification_time: "5",
//   event_status: "pending"
// };

  try {
    console.log('Отправляем данные:', payload);
    
    const response = await fetch('https://flask.stk8s.66bit.ru/update_event', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Ответ сервера:', result);
    
    return {
      success: true,
      message: result.message,
      data: result.task || result.event || result
    };

  } catch (error) {
    console.error('Ошибка обновления:', error);
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
}

// функция для проверки
async function testUpdate() {
  const updateData = {
    task_name: "Обнова =D",
    task_description: "Привет! Я обновленный зеленый слоник",
    task_status: "completed",
    event_time_first: "14:30",
    event_time_second: "16:30"
  };

  const taskId = 19; 

  console.log(`Пытаемся обновить задачу ${taskId}...`);
  const result = await updateTask(taskId, updateData);
  
  if (result.success) {
    console.log('Успех:', result.message);
    console.log('Обновленные данные:', result.data);
    alert(`Задача обновлена: ${result.message}`);
  } else {
    console.error(' Ошибка:', result.message);
    alert(`Ошибка: ${result.message}`);
  }
}

// Автоматический запуск при загрузке (для теста)
document.addEventListener('DOMContentLoaded', () => {
  console.log('Скрипт обновления задач инициализирован');
  testUpdate(); // Раскомментируйте для автоматического теста
});
