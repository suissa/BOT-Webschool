const TelegramBot = require( `node-telegram-bot-api` )

const YoutubeInMp3 = require('./../crawler/providers/youtubeinmp3')

// replace the value below with the Telegram TOKEN you receive from @BotFather
const TOKEN = `333805026:AAHUiSsbAY909SWIxjxKWTHktMc0V8CimT4`
const TEXT_POSITION = 1


// console.log('YoutubeInMp3', )
// Create a bot that uses `polling` to fetch new updates
const bot = new TelegramBot( TOKEN, { polling: true } )

const defaultReplyMessage = `Received your message`

const cbEcho = ( bot ) => ( msg, match ) => 
  sendMessageFrom( bot, match[ TEXT_POSITION ] )( msg )

const cbFind = ( bot ) => ( msg, match ) =>  
  sendMessageFrom( bot, match[ TEXT_POSITION ] )( msg )

const getOnlyLink = ( obj ) => obj.link

const sendingMessagesFrom = ( bot, msg ) => ( reply ) => //console.log('reply ', reply )
  sendMessageFrom( bot, reply )( msg )

const sendYoutubeLinks = ( bot, msg  ) => ( body ) =>
  ( body.map ) 
      ? body.slice(0, 1)
            .map( getOnlyLink )
            .map( sendingMessagesFrom( bot , msg ) )
      : sendingMessagesFrom( bot , msg )( body )
                    
const cbVideo = ( bot ) => ( msg, match ) =>  
  YoutubeInMp3.search( match[ TEXT_POSITION ] )
              .then( sendYoutubeLinks( bot, msg ) )

const cbAula = ( bot ) => ( msg, match ) =>  
  YoutubeInMp3.search( match[ TEXT_POSITION ] + ` webschool` )
              .then( sendYoutubeLinks( bot, msg ) )

const BOT_URL = `http://localhost:3000/api/bot/`
const cbMyID = ( bot ) => ( msg, match ) =>  
  sendMessageFrom( bot, BOT_URL + msg.chat.id )( msg )

const testFor = {
  echo: {
    regex: /\/echo (.+)/,
    andExecute: cbEcho( bot )
  },
  aula: {
    regex: /\/aula (.+)/,
    andExecute: cbAula( bot )
  },
  ask: {
    regex: /(\/ask (.+)|\/pergunta (.+))/,
    andExecute: cbAula( bot )
  },
  id: {
    regex: /\/id/,
    andExecute: cbMyID( bot )
  },
  // find: {
  //   regex: /\/find (.+)/,
  //   andExecute: cbFind( bot )
  // },
  // video: {
  //   regex: /\/video (.+)/,
  //   andExecute: cbVideo( bot )
  // },
}


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
