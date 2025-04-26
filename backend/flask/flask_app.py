from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
import requests
import psycopg2
import json


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

    def get_object_by_value(self, table_name, column_name, value):
        self.cursor.execute(f'SELECT * FROM {table_name} WHERE {column_name} = %s LIMIT 1', (value,))
        return self.cursor.fetchone()

    def delete_object_by_id(self, table_name, id):
        try:
            self.cursor.execute(f'DELETE FROM {table_name} WHERE id = %s', (id,))
            self.connection.commit()
            print('Удаление из базы данных завершилось успешно.')
        except Exception as e:
            print('Ошибка при удалении данных:', e)

    def get_new_id(self, table_name):
        self.cursor.execute(f'SELECT * FROM \"{table_name}\" ORDER BY ID DESC LIMIT 1')
        result = self.cursor.fetchone()
        return 0 if result is None else result[0] + 1


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

    user = db.get_object_by_value('users', 'telegram_id', telegram_id)
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

    telegram_id, user_id = find_user(data)
    time_to_schedule = parse_date(data['task_date'], data['task_notification_time'], data['task_time'] + ':00')

    # Создаем новую задачу
    new_task = (
        user_id,
        data['task_type'],
        data['task_name'],
        data.get('task_description', None),
        ','.join(data.get('task_tags', [])),
        data.get('task_date', None),
        data.get('task_notification_time', None),
        data['task_status'],
        data.get('task_priority', None),
        data['task_time']
    )

    db.insert_into_table('tasks', new_task)

    task_id = db.get_new_id('tasks') - 1
    data_to_schedule = get_data_to_schedule(telegram_id, task_id, time_to_schedule, 
        data['task_type'], f"Не забудь о своей задаче! {data['task_name']}!")

    send_data_to_server(data_to_schedule)

    data['task_id'] = task_id
    return jsonify({'message': 'Задача успешно создана.', 'task': data}), 201


# Маршрут для добавления нового события в базу данных
@app.route('/events', methods=['POST'])
def create_event():
    data = request.json

    telegram_id, user_id = find_user(data)
    time_to_schedule = parse_date(data['event_date'], data['event_notification_time'], data['event_time_first'])

    # Создаём новое событие
    new_event = (
        user_id,
        data['event_type'],
        data['event_name'],
        data.get('event_description', None),
        data.get('event_date', None),
        data.get('event_notification_time', None),
        data['event_status'],
        data['event_time_first'],
        data['event_time_second'],
        time_to_schedule
    )

    db.insert_into_table('events', new_event)

    event_id = db.get_new_id('events') - 1
    data_to_schedule = get_data_to_schedule(telegram_id, event_id, time_to_schedule, 
        data['event_type'], f"Не забудь о своём событии! {data['event_name']}!")

    send_data_to_server(data_to_schedule)

    data['event_id'] = event_id
    return jsonify({'message': 'Событие успешно создано.', 'event': data}), 201


# Маршрут для удаления задачи/события
@app.route('/delete', methods=['PUT'])
def delete_object_by_id():
    data = request.json
    telegram_id, user_id = find_user(data)
    object_id, object_type = data['id'], data['type']
    object = db.get_object_by_value(object_type + 's', 'id', object_id)
    if object and object[1] == user_id:
        data_to_schedule = {
            'telegram_id': telegram_id,
            'schedule_id': object_id,
            'type': object_type
        }
        send_data_to_server(data_to_schedule, 'https://node.stk8s.66bit.ru/unschedule')
        db.delete_object_by_id(object_type + 's', object_id)
        return jsonify({'message': 'Объект был удалён.'}), 200
    return jsonify({'message': 'Что-то пошло не так.'}), 400



def get_data_to_schedule(telegram_id, schedule_id, time, type, message):
    return {
        'telegram_id': telegram_id,
        'schedule_id': schedule_id,
        'time': time,
        'type': type,
        'message': message
    }

def find_user(data):
    telegram_id = data['user_id']
    user = db.get_object_by_value('users', 'telegram_id', telegram_id)
    if not user:
        return jsonify({'message': 'Пользователь не найден.'}), 404
    return telegram_id, user[0]

def parse_date(date, notification_time, start_time):
    base_date = datetime.strptime(f"{date} {start_time}", "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc)
    base_date -= timedelta(minutes=notification_time + 5 * 60)
    return base_date.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"

def send_data_to_server(data, url = 'https://node.stk8s.66bit.ru/schedule'):
    try:
        response = requests.post(url, json=data)

        if response.status_code == 201:
            print("Данные успешно отправлены:", response.json())
        elif response.status_code == 200:
            print("Успешно!", response.json())
        else:
            print(f"Ошибка при отправке данных: {response.status_code} - {response.text}")
    except Exception as e:
        print("Произошла ошибка:", e)


# Запуск приложения
if __name__ == '__main__':
    print('Your app is listening on port 80')
    app.run(port=80)
