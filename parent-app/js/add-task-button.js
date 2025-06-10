const button = document.querySelector('.add-button');
const cancel = document.querySelector('.cancel-button');
const approuve = document.querySelector('.approuve-button');
const form = document.querySelector('.add-task');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const startTime = document.querySelector('.start-task-time');
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
    form.reset();
}

form.addEventListener('reset', () => {
    resetForm();
    document.getElementById('inputFieldPriority').classList.remove('not-matter', 'normal', 'matter');
});

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);

    const taskName = formData.get('new-task-name');
    const startTime = formData.get('start-task-time');
    const id = document.querySelector('.current-id');
    const dateInput = document.querySelector('.date-input').value;

    const task = {
        user_id: id.value,
        task_name: taskName.trim(),
        task_description: '',
        task_type: 'task',
        task_tags: '',
        task_priority: form.querySelector('[name="priority-level"]').value,
        task_date: dateInput,
        task_notification_time: 10,
        task_status: "pending",
        task_time: startTime,
    };

    await fetch('https://flask.stk8s.66bit.ru/tasks', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => {
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        console.log(response.json());
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка отправки: ' + error.message);
    });

    document.getElementById('inputFieldPriority').classList.remove('not-matter', 'normal', 'matter');

    id.dispatchEvent(new Event('change'));
    resetForm();
});