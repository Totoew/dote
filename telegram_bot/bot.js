const { Telegraf } = require('telegraf');

const bot = new Telegraf('7688220876:AAEdlJxaqWj9ZBaJsKU_b8Mxu0oBSC99CPY');
const domain = 'https://school-planner.netlify.app';

bot.start(async (ctx) => {
    const userId = ctx.from.id;

    try {
        await ctx.reply('Нажмите, чтобы открыть приложение.', {
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
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'telegram_id': userId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Регистрация прошла успешно:', data);
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Бот заблокирован пользователем:', userId);
        } else {
            console.error('Ошибка при обработке команды /start:', error);
        }
    }
});

// Запуск бота
bot.launch()
    .then(() => console.log('Bot launched successfully'))
    .catch((err) => console.error('Error launching bot:', err));