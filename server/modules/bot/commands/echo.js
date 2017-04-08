const HOST = `http://127.0.0.1:3000`
const BOT_URL = `${HOST}/api/bot`


const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

// const thisFunction = ( bot ) => ( msg, match ) => console.log('msg', msg)
const thisFunction = ( bot ) => ( msg, match ) => 
  sendMessageFrom( bot, `${BOT_URL}/${msg.chat.id}` )( msg )

module.exports = ( bot ) => ({
  regex: /\/echo (.+)/,
  andExecute: thisFunction( bot ), 
  isSlashCommad: true, 
  helpText: 'Repete a mensagem enviada (suporta Markdown)'
})