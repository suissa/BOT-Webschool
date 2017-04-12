
const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

const log = (s) => console.log('log: ', s)

const thisFunction = ( bot, io ) => ( msg, match ) => {

  console.log('msg start', msg)
  // if ( msg.from.id == `77586615` ) {
  //   sendMessageFrom( bot, `${BOT_URL}/${msg.chat.id}` )( msg )

  // }
}
console.log('start')
module.exports = ( bot, io ) => {

  return {
    regex: /\/start (.+)/,
    andExecute: thisFunction( bot, io ), 
    isSlashCommad: true, 
    helpText: 'Repete a mensagem enviada (suporta Markdown)'
  }
}
// { _id: 58e924dd1979166977958f52,
//   question: 'opdopskop??',
//   __v: 0,
//   updated_at: 2017-04-08T17:58:48.104Z,
//   created_at: 2017-04-08T17:58:48.104Z,
//   user_id: '77586615',
//   answered: false,
//   response: '' }