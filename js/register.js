  function sendRequest(telegram_id) {
      const url = 'https://laert.pythonanywhere.com/register'; // Замените на ваш URL
  
      fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'telegram_id': telegram_id }),
      });
      /*.then(response => response.json())
      .then(data => {
          console.log(data['telegram_id']);
      })
      .catch((error) => {
          console.error('Ошибка:', error);
      });*/
    }


  function getTelegramId(initData) {
    if (!initData) {
        return null;
    }

    // Декодируем строку из Base64
    const jsonString = atob(initData); // Используйте atob для декодирования base64
    const data = JSON.parse(jsonString); // Парсим JSON-строку

    // Извлекаем telegram_id
    return data.user.telegram_id; // В зависимости от структуры объекта может быть 'id' или 'telegram_id'
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const initData = urlParams.get('initData');
    const telegram_id = getTelegramId(initData);
    console.log('Telegram ID:', telegram_id);
    sendRequest(telegram_id);
};
  