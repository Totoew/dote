// Получаем кнопку переключения темы
const themeToggle = document.getElementById('theme-toggle');

// Проверяем, какая тема сохранена в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

// Функция для установки темы
function setTheme(theme) {
  const linkElement = document.getElementById('theme-style');
  if (theme === 'dark') {
    linkElement.href = "theme-dark.css";
    themeToggle.querySelector('.theme-image').src = "/img/rectan_light.jpg";
    document.querySelector('.theme-text').textContent = 'Сменить тему на светлую';
  } else {
    linkElement.href = "theme-light.css";
    themeToggle.querySelector('.theme-image').src = "/img/rectan_dark.jpg";
    document.querySelector('.theme-text').textContent = 'Сменить тему на темную';
  }
  localStorage.setItem('theme', theme);
}

// Обработчик нажатия на кнопку
themeToggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});