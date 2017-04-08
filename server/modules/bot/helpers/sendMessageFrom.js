const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

module.exports = sendMessageFrom