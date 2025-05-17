async function deleteEventById(eventId = 9){
  try {
    const response = await fetch('https://flask.stk8s.66bit.ru/delete', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: 965696687,
        id: eventId,       
        type: 'event',
      }),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log('Успех:', result.message);
      return true;
    } else if (response.status === 400) {
      const error = await response.json();
      console.error(' Ошибка:', error.message);
      return false;
    } else {
      console.error('Неожиданный статус:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Сетевая ошибка:', error);
    return false;
  }
}

deleteEventById(9).then(success => {
  if (success) {
    location.reload(); 
  } else {

  }
});