const profilesButton = document.querySelector('.profiles-button');
const modal = document.querySelector('.modal');
const profileImage = document.querySelector('.profile-avatar');
const imageContainer = document.querySelector('.image-container');
const currentId = document.querySelector('.current-id');
const search = window.location.search;
const links = document.querySelectorAll('.nav-item a');

links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '') {
    const separator = href.includes('?') ? '&' : '?';
    link.setAttribute('href', href + (search ? separator + search.slice(1) : ''));
    }
});

const params = new URLSearchParams(search);

const childObjects = getObjects(params);



/*const childObjects = [
    {
        id: 965696687,
        avatar: 'https://api.telegram.org/file/bot7688220876:AAHoRa5qkgAhtY0MhnwrPmSqsqQyjHdjQI8/photos/file_0.jpg',
        name: 'Laert'
    },
    {
        id: 1685160398,
        avatar: '/img/base-user.png',
        name: 'NeLaert'
    }
];*/

const changeProfile = (object) => {
    profileImage.src = object.avatar;
    currentId.value = object.id;
    currentId.dispatchEvent(new Event('change'));
    modal.style.display = 'none';
};

changeProfile(childObjects[0]);


profilesButton.onclick = () => {
    imageContainer.innerHTML = '';
    childObjects.forEach((child) => {
        const childElement = document.createElement('div');
        childElement.classList.add('child');

        const childImage = document.createElement('img');
        childImage.classList.add('profile-avatar');
        childImage.src = child.avatar;

        const childName = document.createElement('p');
        childName.textContent = child.name;

        childElement.appendChild(childImage);
        childElement.appendChild(childName);

        childElement.onclick = () => {
            changeProfile(child);
        };

        imageContainer.appendChild(childElement);
    });
    modal.style.display = 'block';
};

function getObjects (params) {
    const avatarLinks = params.get('avatars').split(',');
    const childId = params.get('id').split(',');
    const childNames = params.get('names').split(',');
    const objects = [];
    for (let i = 0; i < childId.length; i++) {
        const object = {
            id: childId[i],
            avatar: avatarLinks[i],
            name: childNames[i]
        }
        objects.push(object);
    }
    return objects;
};