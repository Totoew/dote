
document.getElementById('lightTaskForm').addEventListener('submit', function (evt) {
    evt.preventDefault(); 

    const form = evt.target;
    const formData = new FormData(form); 

    fetch('https://example.com/submit', {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Ответ сервера:', data); 
        alert('Форма успешно отправлена!');
    })
    .catch(error => {
        console.error('Ошибка:', error); 
        alert('Произошла ошибка при отправке формы.');
    });
});