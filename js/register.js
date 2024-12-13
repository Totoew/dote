/* window.Telegram.WebApp.ready.then(() => {
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
  }); */

  const task = document.querySelector('.task-card:last-child').querySelector('.name-task');
  const tg = window.Telegram.WebApp;

  // Функция для отправки запроса на сервер
  function sendRequest() {
      const telegramId = tg.initDataUnsafe.user.id; // Получаем Telegram ID пользователя
      const url = 'https://laert.pythonanywhere.com/register'; // Замените на ваш URL
  
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegram_id: telegramId }),
      })
      .then(response => response.json())
      .then(data => {
        task.textContent = data['telegram_id'];
      })
      .catch((error) => {
          console.error('Ошибка:', error);
      });
  }
  
  // Отправляем запрос сразу при открытии приложения
  window.onload = function() {
      sendRequest();
  };
  