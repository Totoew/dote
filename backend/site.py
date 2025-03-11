from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# Дальше идёт описание таблиц в базе данных

# Модель пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.Integer, unique=True, nullable=False)

# Модель задачи со всеми необходимыми полями
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    task_type = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    tags = db.Column(db.String(255), nullable=True)
    date = db.Column(db.String(50), nullable=True)
    notification_time = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(15), nullable=False)
    priority = db.Column(db.String(25), nullable=True)

# Модель события со всеми необходимыми полями
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    event_type = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    date = db.Column(db.String(50), nullable=True)
    notification_time = db.Column(db.Integer, nullable=True)
    status = db.Column(db.String(15), nullable=False)
    start_time = db.Column(db.String(50), nullable=False)
    finish_time = db.Column(db.String(50), nullable=False)

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

    # Проверка, существует ли пользователь в базе данных
    user = User.query.filter_by(telegram_id=telegram_id).first()
    if not user:
        # Если пользователь новый, создаем запись
        user = User(telegram_id=telegram_id)
        db.session.add(user)
        db.session.commit()
    last_user_id = telegram_id
    return jsonify({"telegram_id": telegram_id}), 200



# Маршрут, необходимый для получения последнего пользователя приложения
@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    if last_user_id:
        return jsonify({"user_id": last_user_id}), 200
    return jsonify({"error": "User  not found"}), 404



# Маршрут, используемый для получения всех задач конкретного пользователя
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



# Маршрут для добавления задачи в базу данных
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json

    user = User.query.filter_by(telegram_id=data['user_id']).first()
    if not user:
        return jsonify({'message': 'Пользователь не найден.'}), 404

    # Создаем новую задачу
    new_task = Task(
        user_id=user.telegram_id,
        task_type=data['task_type'],
        name=data['task_name'],
        description=data.get('task_description', None),
        tags=','.join(data.get('task_tags', [])),
        date=data.get('task_date', None),
        notification_time=data.get('task_notification_time', None),
        status=data['task_status'],
        priority=data.get('task_priority', None)
    )

    db.session.add(new_task)
    db.session.commit()

    data['task_id'] = new_task.id
    return jsonify({'message': 'Задача успешно создана.', 'task': data}), 201


# Маршрут для добавления нового события в базу данных
@app.route('/events', methods=['POST'])
def create_event():
    data = request.json

    user = User.query.filter_by(telegram_id=data['user_id']).first()
    if not user:
        return jsonify({'message': 'Пользователь не найден.'}), 404

    # Создаём новое событие
    new_event = Event(
        user_id=user.telegram_id,
        event_type=data['event_type'],
        name=data['event_name'],
        description=data.get('event_description', None),
        date=data.get('event_date', None),
        notification_time=data.get('event_notification_time', None),
        status=data['event_status'],
        start_time=data['event_time_first'],
        finish_time=data['event_time_second']
    )

    db.session.add(new_event)
    db.session.commit()

    data['event_id'] = new_event.id
    return jsonify({'message': 'Событие успешно создано.', 'event': data}), 201



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
    with app.app_context():
        db.create_all()
