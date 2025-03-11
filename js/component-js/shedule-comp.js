//функция для загрузки компонентов 
//и их стилей к основному документу
document.addEventListener('DOMContentLoaded', async () => {
    const header = await fetch('./components/sheduleHeader.html').then(response => response.text());
    const listTasks = await fetch('./components/sheduleGrid.html').then(response => response.text());
    const footer = await fetch('./components/footer.html').then(response => response.text());

    document.getElementById('header').innerHTML = header;
    document.getElementById('list-tasks').innerHTML = listTasks;
    document.getElementById('footer').innerHTML = footer;

    loadCSS('sheduleHeader');
    loadCSS('sheduleGrid');
    loadCSS('sheduleFooter');
});

function loadCSS(componentName) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./css/components-css/${componentName}.css`;
    document.head.appendChild(link);
}