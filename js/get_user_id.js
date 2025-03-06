async function get_user_id() {
    try {
        const response = await fetch('https://laert.pythonanywhere.com/get_user_id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data['user_id'];
    } catch (error) {
        console.error('Ошибка:', error);
        return null; // или можно выбросить ошибку, если это необходимо
    }
}

module.exports = { get_user_id };