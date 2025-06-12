document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const pageSelect = document.getElementById('page-select');
    const goButton = document.getElementById('go-button');

    // Обработка изменения значения в select
    pageSelect.addEventListener('change', function () {
        if (this.value !== '') { 
            goButton.classList.add('active'); 
        } else {
            goButton.classList.remove('active'); 
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

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
