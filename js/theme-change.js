document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
function updateTheme() {
    const currentTheme = body.getAttribute('data-theme');

    document.querySelectorAll('[data-light][data-dark]').forEach(img => {
        img.src = currentTheme === 'light' 
        ? img.getAttribute('data-light') 
        : img.getAttribute('data-dark');
    });


    const themeSwitcherText = document.querySelector('.theme-block:last-child .theme-text');
    if (themeSwitcherText) {
        themeSwitcherText.textContent = currentTheme === 'light' 
        ? 'Тёмная тема' 
        : 'Светлая тема';
    }
}
    
function toggleTheme() {
    const currentTheme = themeToggle.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateTheme();
}
    
themeToggle.addEventListener('change', toggleTheme);
updateTheme();
});