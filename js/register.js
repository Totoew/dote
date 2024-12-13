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
  //const tg = window.Telegram.WebApp;

  // Функция для отправки запроса на сервер
  function sendRequest(telegram_id) {
      //const telegramId = tg.initDataUnsafe.user.id; // Получаем Telegram ID пользователя
      const url = 'https://laert.pythonanywhere.com/register'; // Замените на ваш URL
  
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'telegram_id': telegram_id }),
      })
      .then(response => response.json())
      .then(data => {
          console.log(data['telegram_id']);
      })
      .catch((error) => {
          console.error('Ошибка:', error);
      });
  }
  
  // Отправляем запрос сразу при открытии приложения


  function getTelegramId(initData) {
    if (!initData) {
        return null;
    }

    // Декодируем строку из Base64
    const jsonString = atob(initData); // Используйте atob для декодирования base64
    const data = JSON.parse(jsonString); // Парсим JSON-строку

    // Извлекаем telegram_id
    return data.user.id; // В зависимости от структуры объекта может быть 'id' или 'telegram_id'
}

// Используем функцию
const urlParams = new URLSearchParams(window.location.search);
const initData = urlParams.get('initData');
const telegram_id = getTelegramId(initData);

console.log('Telegram ID:', telegramId);

window.onload = function() {
    sendRequest(telegram_id);
};
  