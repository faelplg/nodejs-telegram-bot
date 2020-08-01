process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');

const config = require('./config.json');
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.BOT_TOKEN, {polling: true});

// Matches "/echo <command>"
bot.onText(/\/echo (.+)/g, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match is the result of executing the regexp above
  //on the text content of the message
  console.log('echo command:', msg);

  const chatId = msg.chat.id;
  const resp = match[1]; // capture the command

  // send back the mathced command to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message.
// There are different kinds of messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  console.log('msg:', msg);
  bot.getChatMembersCount(chatId).then((resp) => {
    console.log('members count:', resp);
  });

  bot.onReplyToMessage(msg.chat.id, msg.message_id, (resp) => {
    console.log('resp', resp);
  });
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `Ei, ${msg.from.first_name}! Recebi sua mensagem.`);
});
