const task = document.querySelector('.task-card').querySelector('.name-task');

window.Telegram.WebApp.ready.then(() => {
    const userId = window.tg.user.id;
  
    fetch('https://laert.pythonanywhere.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'telegram_id': userId })
    })
    .then(response => {
      if (!response.ok) {
        console.error('Ошибка отправки данных на сервер');
      } else {
        console.log('ID пользователя успешно отправлен');
      }
      return response.json
    })
    .then(data => {
        task.textContent = data['telegram_id'];
    })
    .catch(error => {
      console.error('Ошибка отправки данных на сервер:', error);
    });
  });
  