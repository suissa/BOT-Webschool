require('dotenv').config()
const TOKEN = process.env.TOKEN
const TEXT_POSITION = 1
const TelegramBot = require( `node-telegram-bot-api` )
const bot = new TelegramBot( TOKEN, { polling: true } )

const defaultReplyMessage = `Received your message`

const testFor = {
  echo: require( `./commands/echo` )( bot ),
  // id: require( `./commands/id` )( bot ),
  aula: require( `./commands/aula` )( bot ),
  ask: require( `./commands/ask` )( bot ),
  ask_list: require( `./commands/ask_list` )( bot ),
}

// console.log('testFor', testFor)
const addRegexTo = ( bot, testFor ) => 
  Object.keys( testFor ).reduce( ( acc, cur ) => {
      console.log('acc, cur', acc, cur)
      bot.onText( testFor[ cur ].regex, testFor[ cur ].andExecute )
   } , [] )


const sendMessageUsing = ( bot ) => ( id ) => ( reply ) => 
  bot.sendMessage( id, reply ) 

const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply, { 
    remove_keyboard: true,
    reply_markup: JSON.stringify({
        one_time_keyboard: true
    })
  })
  // ])

    // inline_keyboard: JSON.stringify( 
    //   [{ text: 'Login', 
    //     url: `http://localhost/login?chat_id=${msg.chat.from.id}`
    //   }])
const addDefaultReplyTo = ( bot, reply ) => 
  bot.on( `message`, sendMessageFrom( bot, reply ) )

start = () => {
  addDefaultReplyTo( bot, defaultReplyMessage )
  addRegexTo( bot, testFor )
}

start()




module.exports = ( io ) => {


  io.on('connection', (socket) => {
    console.log('connected');


    // console.log(' Client connected from Server HTTP')
    // clientSockets.push(socket)
    // if (++id > 1) socket.name = socketType
    // console.log(' Count clients connected = ' + id)

    socket.on('message', ( msg ) => { 
      console.log('on message: ', msg)
  // ( msg ) => { 
  //       console.log('emit message from back: ', msg)
  //     }
      socket.emit('message', 'emit message from back: ' + msg)
    })

    socket.on('disconnect', () => { 
      console.log(' Client disconnect from Server HTTP')
    })

    socket.on('error', (err) => console.log(' Server HTTP Error: ' + err.message))

    socket.on('disconnect', () => {
        console.log('disconnected');
    });
  });



  return {
    bot,
    start,
    sendMessage: sendMessageUsing( bot )
  }
}
