document.addEventListener("DOMContentLoaded", function () {
    const themeStyle = document.getElementById('theme-style');
    const href = themeStyle.getAttribute('href');
    const numberCSSfile = href.charAt(href.length - 5);
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    console.log('Проверка. Номер CSS-файла: ', numberCSSfile);

    function setTheme(theme) {
        if (theme === "light") {
            themeStyle.setAttribute('href', `css/light-style-${numberCSSfile}.css`);
            body.setAttribute('data-theme', 'light');
        } else {
            themeStyle.setAttribute('href', `css/style-${numberCSSfile}.css`);
            body.setAttribute('data-theme', 'dark');
        }
        localStorage.setItem('theme', theme); 

        //Обновляем изображения при смене темы
        document.querySelectorAll('[data-light][data-dark]').forEach(img => {
            img.src = theme === 'light' ? img.getAttribute('data-light') : img.getAttribute('data-dark');
        });
    }

    //Проверяем сохранённую тему при загрузке страницы
    const savedTheme = localStorage.getItem('theme') || 'dark'; 
    setTheme(savedTheme);

    //Функция для смены темы
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        themeToggle.checked = false;
        setTheme(currentTheme);
    }

    themeToggle.addEventListener('click', toggleTheme);
});
