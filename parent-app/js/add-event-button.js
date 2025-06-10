const button = document.querySelector('.add-button');
const cancel = document.querySelector('.cancel-button');
const approuve = document.querySelector('.approuve-button');
const form = document.querySelector('.add-event');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const startTime = document.querySelector('.start-event-time');
const finishTime = document.querySelector('.finish-event-time');
const dateInput = document.querySelector('.date-input');

dateInput.addEventListener('change', () => {
    const currentDate = new Date();
    const chosenDate = new Date(dateInput.value);
    currentDate.setHours(0, 0, 0, 0);
    chosenDate.setHours(0, 0, 0, 0);

    button.style.display = chosenDate.getTime() >= currentDate.getTime() ? 'flex' : 'none';
});

button.addEventListener('click', () => {
    button.style.display = 'none';
    form.classList.remove('hidden');
    modal.style.display = 'block';
    modalContent.style.display = 'none';
});

function resetForm() {
    button.style.display = 'flex';
    form.classList.add('hidden');
    modal.style.display = 'none';
    modalContent.style.display = 'flex';
    startTime.style.backgroundColor = '#F26E56';
    finishTime.style.backgroundColor = '#F26E56';
    form.reset();
}

form.addEventListener('reset', resetForm);

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);

    const eventName = formData.get('new-event-name');
    const startTime = formData.get('start-event-time');
    const finishTime = formData.get('finish-event-time');
    const id = document.querySelector('.current-id');
    const dateInput = document.querySelector('.date-input').value;

    const event = {
        user_id: id.value,
        event_name: eventName.trim(),
        event_description: '',
        event_type: 'event',
        event_date: dateInput,
        event_time_first: startTime,
        event_time_second: finishTime,
        event_notification_time: 10,
        event_status: "pending",
    };

    await fetch('https://flask.stk8s.66bit.ru/events', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    })
    .then(response => {
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        console.log(response.json());
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка отправки: ' + error.message);
    });

    id.dispatchEvent(new Event('change'));
    resetForm();
});