const Model = require('../../../_molecules/question-model');
const create = require('../../../_organelles/create-question')( Model )

const getOnlyLink = ( obj ) => obj.link

const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

const sendingMessagesFrom = ( bot, msg ) => ( reply ) => //console.log('reply ', reply )
  sendMessageFrom( bot, reply )( msg )

// const sendYoutubeLinks = ( bot, msg  ) => ( body ) =>
//   ( body.map ) 
//       ? body.slice(0, 1)
//             .map( getOnlyLink )
//             .map( sendingMessagesFrom( bot , msg ) )
//       : sendingMessagesFrom( bot , msg )( body )
                    
const thisFunction = ( bot ) => ( msg, match ) => {
  console.log('create msg', msg)
  
  create( match[ 1 ], msg )
}

module.exports = ( bot ) => ({
  regex: /\/ask (.+)/,
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
