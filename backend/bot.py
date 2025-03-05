from flask import Flask, request, jsonify
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes
from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import requests
import asyncio
import nest_asyncio
import threading

nest_asyncio.apply()

BOT_TOKEN = '7688220876:AAEdlJxaqWj9ZBaJsKU_b8Mxu0oBSC99CPY'
DOMAIN = 'https://school-planner.netlify.app'
app = Flask(__name__)

# Инициализация Telegram Application
application = Application.builder().token(BOT_TOKEN).build()

# Обработка команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.message.from_user.id
    try:
        await update.message.reply_text(
            'Нажмите, чтобы открыть приложение.',
            reply_markup={
                'inline_keyboard': [[{
                    'text': 'Открыть',
                    'web_app': {'url': f'{DOMAIN}/#/'}
                }]],
                'resize_keyboard': True,
                'one_time_keyboard': True
            }
        )

        url = 'https://laert.pythonanywhere.com/register'
        response = requests.post(
            url,
            json={'telegram_id': user_id},
            headers={'Content-Type': 'application/json'}
        )
        response.raise_for_status()
        data = response.json()
        print('Регистрация прошла успешно:', data)
    except Exception as error:
        print(f'Ошибка при обработке команды /start: {error}')

application.add_handler(CommandHandler('start', start))

# Словарь для хранения запланированных сообщений
scheduled_messages = {}

# Инициализация планировщика
scheduler = AsyncIOScheduler()

# Функция для отправки сообщения
async def send_message(chat_id, message):
    print("Сообщение было отправлено")
    await application.bot.send_message(chat_id=chat_id, text=message)

# Функция для выполнения запланированного сообщения
async def execute_message(chat_id, message):
    print("Сообщение отправляется")
    await send_message(chat_id, message)
    print("Сообщение было удалено")
    if chat_id in scheduled_messages:
        scheduled_messages[chat_id] = [msg for msg in scheduled_messages[chat_id] if msg[0] != message]

# Запланировать отправку сообщения
def schedule_message(chat_id, message, send_time):
    # Преобразуем время в формат datetime
    send_datetime = datetime.strptime(send_time, "%H:%M").replace(
        year=datetime.now().year,
        month=datetime.now().month,
        day=datetime.now().day
    )
    print(send_datetime, '--------', datetime.now())
    # Добавляем задачу в планировщик
    scheduler.add_job(
        execute_message,  # Асинхронная функция
        'date',
        run_date=send_datetime,
        args=[chat_id, message]  # Передаем аргументы
    )

# Маршрут для планирования сообщения
@app.route('/schedule', methods=['POST'])
def schedule_route():
    data = request.json
    user_id = data.get('user_id')
    send_time = data.get('send_time')
    message = data.get('message')
    print(user_id, send_time, message)
    if not user_id or not send_time or not message:
        return jsonify({'status': 'error', 'message': 'Необходимо указать user_id, send_time и message.'}), 400

    if user_id not in scheduled_messages:
        scheduled_messages[user_id] = []
    scheduled_messages[user_id].append((message, send_time))

    schedule_message(user_id, message, send_time)
    return jsonify({'status': 'success', 'message': f'Сообщение запланировано на {send_time}: "{message}"'}), 200

@app.route('/webhook', methods=['POST'])
def webhook():
    update = Update.de_json(request.get_json(force=True), application.bot)
    asyncio.run(start(update, None))
    return jsonify({'status': 'ok'}), 200

# Запуск планировщика в отдельном потоке
def run_scheduler():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    # Запускаем планировщик
    scheduler.start()

    # Запускаем event loop
    try:
        loop.run_forever()
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()

if __name__ == '__main__':
    # Запуск планировщика в отдельном потоке
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()
