const { Telegraf } = require('telegraf');

const bot = new Telegraf('7688220876:AAEdlJxaqWj9ZBaJsKU_b8Mxu0oBSC99CPY');
const domain = 'https://school-planner.netlify.app';

// Начальное приветственное сообщение
bot.start((ctx) => {
    const userId = ctx.from.id;
    ctx.reply('Нажмите, чтобы открыть приложение.', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Открыть",
                        web_app: {
                            url: `${domain}/#/`
                        }
                    }
                ],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });

    // Отправление запроса на регистрацию на сервер
    const url = 'https://laert.pythonanywhere.com/register';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'telegram_id': userId }),
    })
    .then(response => response.json())
    .catch((error) => {
    console.error('Ошибка:', error);
    });
});

// Запуск бота
bot.launch()
    .then(() => console.log('Bot launched successfully'))
    .catch((err) => console.error('Error launching bot:', err));