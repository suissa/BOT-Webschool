


let sendMessageBot = (robo) => (chatId, text, opts) =>
  robo.sendMessage(chatId, text, opts);

const callbackOnTextBot = ( robo, chatId, text, opts ) =>
  sendMessageBot(robo)(chatId, text, opts)

let onTextBot = (robo) => (regexp, callback) => {
  robo.onText(regexp, callback);

}
//

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message
//
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
//   // console.log('RESP ::; ', resp);
//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
//   return sendMessageBot(bot)(chatId, text, opts)
// });



  // var createUsuarioModel = (Organism) => (obj, callback) => Organism.create(obj, callback);
  //   var createUsuario = createUsuarioModel(userOrganism.usuarioModel);
module.exports = {
  sendMessageBot,
  onTextBot,
  callbackOnTextBot
  };
