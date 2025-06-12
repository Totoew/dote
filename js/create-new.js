document.addEventListener('DOMContentLoaded', function() {
    const pageSelect = document.getElementById('mySelect');
    const goButton = document.getElementById('go-button');
    const add_text = document.querySelector(".button-add-task")
    pageSelect.addEventListener('change', function () {
            goButton.classList.remove('yellow-button');
            goButton.classList.add('active');
            add_text.classList.remove('button-add-task');
            add_text.classList.add('black-add-text');
    });

    goButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        const selectedPage = pageSelect.value;

        if (selectedPage !== '') {
            window.location.href = selectedPage; 
        }
    });
});
/*
document.getElementById('mySelect').addEventListener('change', function() {
    this.style.color = 'white'; 
});*/

document.getElementById('mySelect').addEventListener('change', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    this.style.color = currentTheme === 'dark' ? 'white' : 'black';
});

document.getElementById("mySelect").addEventListener("change", function () {
    if (this.value !== "") {
        // Если выбрана любая другая опция, кроме "Выберите..."
        this.querySelectorAll("option")[0].style.display = "none"; 
    } else {
        this.options[0].style.display = "";
    }
});

//скрытие и показ картинки "плюс" при выборе селекта
let isFirstChange = true;
function toggleImages(value) {
    const firstImage = document.getElementById('first-image');
    const secondImage = document.getElementById('second-image');

    if (isFirstChange && value !== '') {
        firstImage.style.display = 'none';
        secondImage.style.display = 'block';
        isFirstChange = false;
    }
}

//вернуться назад
document.getElementById('backButton').addEventListener('click', () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html'; 
    }
});

//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
        event.preventDefault();
    }
}, { passive: false });
