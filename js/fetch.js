//тестовый файл для попытки отправки данных на сервер 
const eventMOC = {
    user_id: 965696687,
    event_name: "День рождения",
    event_description: "Описание дня рождения",
    event_type: "event",
    event_date: "2024-12-31",
    event_time_first: "21:00",
    event_time_second: "23:00",
    event_notification_time: "30",
    event_status: "pending"
};

const jsonData = JSON.stringify(eventMOC);

fetch('https://laert.pythonanywhere.com/events', {
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

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
      event.preventDefault();
    }
  }, { passive: false });