document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const pageSelect = document.getElementById('mySelect');
    const goButton = document.getElementById('go-button');
    const add_text = document.querySelector(".button-add-task")
    // Обработка изменения значения в select
    pageSelect.addEventListener('change', function () {
            goButton.classList.remove('yellow-button');
            goButton.classList.add('active');
            add_text.classList.remove('button-add-task');
            add_text.classList.add('black-add-text');
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


document.getElementById('mySelect').addEventListener('change', function() {
    this.style.color = 'white'; // Устанавливаем цвет текста белым
});

document.getElementById("mySelect").addEventListener("change", function () {
    if (this.value !== "") {
        // Если выбрана любая другая опция, кроме "Выберите..."
        this.querySelectorAll("option")[0].style.display = "none"; // Скрываем первый элемент (Выберите...)
    } else {
        this.options[0].style.display = ""; // Показываем обратно, если ничего не выбрано
    }
});