
// async function fetchDataFromServer() {
//   try {
//     const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user_id: 965696687, // Ваш user_id
//         table_name: "events" // Или "tasks" при необходимости
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Ошибка HTTP: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//     return null;
//   }
// }

// // Функция для форматирования и вывода данных в консоль
// function displayDataInConsole(data) {
//   if (!data || !data.objects) {
//     console.log('Нет данных для отображения');
//     return;
//   }

//   console.log('Сообщение от сервера:', data.message);
//   console.log('Полученные события:');
  
//   data.objects.forEach((task, index) => {
//     console.group(`Задача #${index + 1}`);
//     console.log('ID события:', task[0]);
//     console.log('ID пользователя:', task[1]);
//     console.log('Тип:', task[2]);
//     console.log('Название:', task[3]);
//     console.log('Описание:', task[4]);
//     console.log('Дата:', task[5]);
//     console.log('Тип уведомления:', task[6]);
//     console.log('Статус:', task[7]);
//     console.log('Время начала:', task[8]);
//     console.log('Время окончания:', task[9]);
//     console.log('Время уведомления:', task[10]);
//     console.groupEnd();
//   });
// }

// // Основная функция
// (async function() {
//   console.log('Запрашиваю данные с сервера...');
//   const serverData = await fetchDataFromServer();
  
//   if (serverData) {
//     displayDataInConsole(serverData);
//   } else {
//     console.log('Не удалось получить данные с сервера');
//   }
// })();

// Функция для получения данных с сервера
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

async function fetchEvents() {
    try {
      const response = await fetch('https://flask.stk8s.66bit.ru/get_all', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('user_id'),    // Ваш user_id 965696687
          table_name: "tasks"   
        })
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      return data.objects || [];
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return [];
    }
  }

  // Преобразуем массив в массив объектов
  // function transformEvents(eventsArray) {
  //   return eventsArray.map(event => ({
  //     id: event[0],
  //     user_id: event[1],
  //     type: event[2],
  //     name: event[3],
  //     description: event[4],
  //     date: event[5],
  //     notification_type: event[6],
  //     status: event[7],
  //     start_time: event[8],
  //     end_time: event[9],
  //     notification_time: event[10]
  //   }));
  // }
  
  function transformEvents(tasksArray) {
    return tasksArray.map(task => ({
      id: task[0],
      user_id: task[1],
      type: task[2],
      name: task[3],
      description: task[4],
      list_tags: task[5],
      date: task[6],
      task_time: task[10],
      status: task[8],
      task_priority: task[9],
      notification_time: task[7],
    }));
  }

  // Получаем данные и выводим в консоль
  (async function() {
    const rawEvents = await fetchEvents();
    console.log("Сюда: ", rawEvents);
    const tasks = transformEvents(rawEvents);
    
    console.log('Данные с сервера (массив объектов):', tasks);
    
    // Дополнительный красивый вывод в табличном формате
    console.table(tasks);
  })();
