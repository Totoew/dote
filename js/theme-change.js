document.addEventListener("DOMContentLoaded", function () {
  const themeStyle = document.getElementById('theme-style');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body; 

  function toggleTheme() {
      if (themeStyle.getAttribute('href') === 'css/style-6.css') {
          themeStyle.setAttribute('href', 'css/light-style-6.css'); 
          body.setAttribute('data-theme', 'light'); 
      } else {
          themeStyle.setAttribute('href', 'css/style-6.css'); 
          body.setAttribute('data-theme', 'dark'); 
      }

      document.querySelectorAll('[data-light][data-dark]').forEach(img => {
          img.src = body.getAttribute('data-theme') === 'light' ? img.getAttribute('data-light') : img.getAttribute('data-dark');
      });
  }

  themeToggle.addEventListener('click', toggleTheme);
});
