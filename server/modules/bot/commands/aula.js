const YoutubeInMp3 = require('./../../crawler/providers/youtubeinmp3')

const getOnlyLink = ( obj ) => obj.link

const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

const sendingMessagesFrom = ( bot, msg ) => ( reply ) => //console.log('reply ', reply )
  sendMessageFrom( bot, reply )( msg )

const sendYoutubeLinks = ( bot, msg  ) => ( body ) =>
  ( body.map ) 
      ? body.slice(0, 1)
            .map( getOnlyLink )
            .map( sendingMessagesFrom( bot , msg ) )
      : sendingMessagesFrom( bot , msg )( body )
                    
const thisFunction = ( bot ) => ( msg, match ) => 
  YoutubeInMp3.search( match[ 1 ] + ` webschool` )
              .then( sendYoutubeLinks( bot, msg ) )

module.exports = ( bot ) => ({
  regex: /\/aula (.+)/,
  andExecute: thisFunction( bot ), 
  isSlashCommad: true, 
  helpText: 'Repete a mensagem enviada (suporta Markdown)'
})