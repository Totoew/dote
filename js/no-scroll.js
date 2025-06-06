//не закрывать приложение при свайпе вниз
document.addEventListener('touchmove', function (event) {
    if (event.touches && event.touches[0].clientY > 0) {
      event.preventDefault();
    }
  }, { passive: false });

const search = window.location.search;
const links = document.querySelectorAll('.nav-item a');

links.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href !== '') {
    const separator = href.includes('?') ? '&' : '?';
    link.setAttribute('href', href + (search ? separator + search.slice(1) : ''));
  }
});