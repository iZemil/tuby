const TelegramBot = require('node-telegram-bot-api');
const api = require('../api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/random/, (msg, match) => {
    const chatId = msg.chat.id;
    const film = api.random250(),
        title = film.title,
        photo = film.posterLink;


    bot.sendPhoto(chatId, photo, { caption : title });
});

// Listen for any kind of message
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Your message');
// });
