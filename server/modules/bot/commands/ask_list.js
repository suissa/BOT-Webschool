

const Model = require('../../../_molecules/question-model');
const find = require('../../../_organelles/find-question')( Model )

const getOnlyLink = ( obj ) => obj.link

const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

const sendingMessagesFrom = ( bot, msg ) => ( reply ) => //console.log('reply ', reply )
  sendMessageFrom( bot, reply )( msg )

const success = ( data ) => console.log('data', data)

const error = ( err ) => console.log('err', err)

const thisFunction = ( bot ) => ( msg, match ) => {
  console.log('list msg', msg)
  
  // return find( {} ).then( success ).catch( error )
}


module.exports = ( bot ) => ({
  regex: /\/list (.+)/,
  andExecute: thisFunction( bot ), 
  isSlashCommad: true, 
  helpText: 'Repete a mensagem enviada (suporta Markdown)'
})

// create msg { message_id: 413,
//   from: 
//    { id: 77586615,
//      first_name: 'Suissa',
//      last_name: 'Webschool',
//      username: 'osuissa' },
//   chat: 
//    { id: 77586615,
//      first_name: 'Suissa',
//      last_name: 'Webschool',
//      username: 'osuissa',
//      type: 'private' },
//   date: 1491628568,
//   text: '/ask node?',
//   entities: [ { type: 'bot_command', offset: 0, length: 4 } ] }
