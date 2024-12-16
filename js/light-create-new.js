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

document.getElementById("mySelect").addEventListener("change", function () {
    if (this.value !== "") {
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

