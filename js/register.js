  /*function sendRequest(telegram_id) {
      const url = 'https://laert.pythonanywhere.com/register'; // Замените на ваш URL
  
      fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'telegram_id': telegram_id }),
      });
      .then(response => response.json())
      .then(data => {
          console.log(data['telegram_id']);
      })
      .catch((error) => {
          console.error('Ошибка:', error);
      });
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
};*/

// Функция для декодирования URL и извлечения telegram_id
function getTelegramIdFromInitData(initData) {
    // Декодируем initData
    const decodedData = decodeURIComponent(initData);
    
    // Парсим JSON-строку
    const data = JSON.parse(decodedData);
    
    // Извлекаем telegram_id
    return data.user.id; // Предполагается, что telegram_id находится по этому пути
}

// Функция для отправки telegram_id на сервер
async function sendTelegramIdToServer(telegramId) {
    const url = 'https://laert.pythonanywhere.com/register'; // Замените на ваш URL сервера
    const payload = {
        telegram_id: telegramId
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Успешно зарегистрировано:', result);
        } else {
            console.error('Ошибка при регистрации:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
    }
}

// Основная логика
function init() {
    // Получаем URL из адресной строки
    const urlParams = new URLSearchParams(window.location.search);
    const initData = urlParams.get('initData');

    if (initData) {
        const telegramId = getTelegramIdFromInitData(initData);
        sendTelegramIdToServer(telegramId);
    } else {
        console.error('initData не найден в URL');
    }
}

// Запускаем инициализацию при загрузке страницы
window.onload = init;
  