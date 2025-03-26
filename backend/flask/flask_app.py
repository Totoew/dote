from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import psycopg2


class Database:
    def __init__(self, host, port, user, password, database):
        self.connection = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            dbname=database
        )
        print('Connection successed')
        self.cursor = self.connection.cursor()

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
            print('Соединение с базой данных закрыто.')

    def insert_into_table(self, table_name, values):
        try:
            id = (self.get_new_id(table_name),)
            values = id + values

            placeholders = ', '.join(['%s'] * len(values))
            insert_query = f'INSERT INTO \"{table_name}\" VALUES ({placeholders});'
            self.cursor.execute(insert_query, values)
            self.connection.commit()
            print(f'Данные успешно добавлены в таблицу "{table_name}":', values)

        except Exception as e:
            print('Ошибка при добавлении данных:', e)

    def get_new_id(self, table_name):
        self.cursor.execute(f'SELECT * FROM \"{table_name}\" ORDER BY ID DESC LIMIT 1')
        result = self.cursor.fetchone()
        return 0 if result is None else result[0] + 1

    def get_user(self, telegram_id):
        self.cursor.execute('SELECT 1 FROM users WHERE telegram_id = %s LIMIT 1', (telegram_id,))
        return self.cursor.fetchone()


app = Flask(__name__)
CORS(app)
db = Database('my-application-postgres-service', '5432', 'laert', '04062005', 'school-planner')

# Переменная, необходимая для запоминания последнего пользователя, вошедшего в приложение
last_user_id = None


# Маршрут, позволяющий пользователю автоматически зарегистрироваться при входе в приложение
@app.route('/register', methods=['POST'])
def register_user():
    global last_user_id
    data = request.json
    telegram_id = data.get('telegram_id')

    if not telegram_id:
        return jsonify({"error": "Telegram ID is required"}), 400

    user = db.get_user(telegram_id)
    if not user:
        db.insert_into_table('users', (telegram_id,))
    last_user_id = telegram_id
    return jsonify({"telegram_id": telegram_id}), 200


# Маршрут, необходимый для получения последнего пользователя приложения
@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    if last_user_id:
        return jsonify({"user_id": last_user_id}), 200
    return jsonify({"error": "User  not found"}), 404


# Маршрут для добавления задачи в базу данных
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json

    user = db.get_user(data['user_id'])
    if not user:
        return jsonify({'message': 'Пользователь не найден.'}), 404

    telegram_id = user[1]

    # Создаем новую задачу
    new_task = (
        telegram_id,
        data['task_type'],
        data['task_name'],
        data.get('task_description', None),
        ','.join(data.get('task_tags', [])),
        data.get('task_date', None),
        data.get('task_notification_time', None),
        data['task_status'],
        data.get('task_priority', None)
    )

    db.insert_into_table('tasks', new_task)

    data['task_id'] = db.get_new_id('tasks')
    return jsonify({'message': 'Задача успешно создана.', 'task': data}), 201


# Маршрут для добавления нового события в базу данных
@app.route('/events', methods=['POST'])
def create_event():
    data = request.json

    user = db.get_user(data['user_id'])
    if not user:
        return jsonify({'message': 'Пользователь не найден.'}), 404

    telegram_id = user[1]

    # Создаём новое событие
    new_event = (
        telegram_id,
        data['event_type'],
        data['event_name'],
        data.get('event_description', None),
        data.get('event_date', None),
        data.get('event_notification_time', None),
        data['event_status'],
        data['event_time_first'],
        data['event_time_second']
    )

    db.insert_into_table('events', new_event)

    data['event_id'] = db.get_new_id('events')
    return jsonify({'message': 'Событие успешно создано.', 'event': data}), 201


def send_data_to_server(url, data):
    try:
        response = requests.post(url, json=data)

        if response.status_code == 200:
            print("Данные успешно отправлены:", response.json())
        else:
            print(f"Ошибка при отправке данных: {response.status_code} - {response.text}")
    except Exception as e:
        print("Произошла ошибка:", e)

# Маршрут, используемый для получения всех задач конкретного пользователя (не используется)
@app.route('/users/tasks', methods=['GET'])
def get_tasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()

    if not tasks:
        return 'This user has no tasks', 404

    tasks_list = []
    for task in tasks:
        tasks_list.append({
            'user_id': task.user_id,
            'task_id': task.id,
            'task_description': task.description,
            'task_type': task.type,
            'task_name': task.name,
            'task_tags': task.tags,
            'task_date': task.date,
            'task_notification_time': task.notification_time,
            'task_status': task.status,
            'task_priority': task.priority
        })

    return jsonify({'tasks': tasks_list}), 200


# Маршрут для обновления статуса задачи (не используется)
@app.route('/users/<int:user_id>/tasks/<int:task_id>', methods=['PUT'])
def update_task_status(task_id):
    data = request.get_json()

    if not data or 'user_id' not in data or 'status' not in data:
        return jsonify({'message': 'Пожалуйста, укажите user_id и новый статус задачи.'}), 400

    user_id = data['user_id']
    new_status = data['status']

    # Проверка существования задачи
    task = Task.query.filter_by(id=task_id, user_id=user_id).first()
    if task is None:
        return jsonify({'message': 'Задача не найдена или не принадлежит данному пользователю.'}), 404

    # Обновление статуса задачи
    task.status = new_status  # Предполагается, что у вас есть поле status в модели Task
    db.session.commit()

    return jsonify({'message': 'Статус задачи успешно обновлён.'}), 200


# Запуск приложения
if __name__ == '__main__':
    print('Your app is listening on port 80')
    app.run(port=80)
