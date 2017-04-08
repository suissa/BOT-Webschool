const TelegramBot = require( `node-telegram-bot-api` )
require('dotenv').config()

const YoutubeInMp3 = require('./../crawler/providers/youtubeinmp3')

// replace the value below with the Telegram TOKEN you receive from @BotFather
const TOKEN = process.env.TOKEN
const TEXT_POSITION = 1


// console.log('YoutubeInMp3', )
// Create a bot that uses `polling` to fetch new updates
const bot = new TelegramBot( TOKEN, { polling: true } )

const defaultReplyMessage = `Received your message`

// const cbEcho = ( bot ) => ( msg, match ) => 
//   sendMessageFrom( bot, match[ TEXT_POSITION ] )( msg )

// const cbFind = ( bot ) => ( msg, match ) =>  
//   sendMessageFrom( bot, match[ TEXT_POSITION ] )( msg )

// const cbVideo = ( bot ) => ( msg, match ) =>  
//   YoutubeInMp3.search( match[ TEXT_POSITION ] )
//               .then( sendYoutubeLinks( bot, msg ) )

// const cbAula = ( bot ) => ( msg, match ) =>  
//   YoutubeInMp3.search( match[ TEXT_POSITION ] + ` webschool` )
//               .then( sendYoutubeLinks( bot, msg ) )


const testFor = {
  echo: require( `./commands/echo` )( bot ),
  id: require( `./commands/id` )( bot ),
  aula: require( `./commands/aula` )( bot ),
  ask: require( `./commands/ask` )( bot ),
}

console.log('testFor', testFor)
const addRegexTo = ( bot, testFor ) => 
  Object.keys( testFor ).reduce( ( acc, cur ) =>
    bot.onText( testFor[ cur ].regex, testFor[ cur ].andExecute )
  , [] )

const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

const sendMessageUsing = ( bot ) => ( id ) => ( reply ) => 
  bot.sendMessage( id, reply ) 

const addDefaultReplyTo = ( bot, reply ) => 
  bot.on( `message`, sendMessageFrom( bot, reply ) )

start = () => {
  addDefaultReplyTo( bot, defaultReplyMessage )
  addRegexTo( bot, testFor )
}

start()

module.exports = {
  bot,
  start,
  sendMessage: sendMessageUsing( bot )
}
