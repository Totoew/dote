const user_id = null;
function get_user_id () {
    fetch('https://laert.pythonanywhere.com/get_user_id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(data => user_id = data['user_id'])
    .catch((error) => {
    console.error('Ошибка:', error);
    });
    return user_id
}

export { get_user_id }
