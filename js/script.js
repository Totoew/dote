document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const pageSelect = document.getElementById('page-select');
    const goButton = document.getElementById('go-button');

    // Обработка изменения значения в select
    pageSelect.addEventListener('change', function () {
        if (this.value !== '') { // Если выбрано значение
            goButton.classList.add('active'); // Добавляем класс active
        } else {
            goButton.classList.remove('active'); // Убираем класс active
        }
    });

    // Обработчик клика по кнопке
    goButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение кнопки
        const selectedPage = pageSelect.value;
        
        if (selectedPage !== '') {
            window.location.href = selectedPage; // Переходим на выбранную страницу
        }
    });
});
