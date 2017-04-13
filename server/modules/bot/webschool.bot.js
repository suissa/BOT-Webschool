require('dotenv').config()
const TOKEN = process.env.TOKEN
const TEXT_POSITION = 1
const TelegramBot = require( `node-telegram-bot-api` )
const bot = new TelegramBot( TOKEN, { polling: true } )
let ID = `77586615`

const User = require( `./../../_molecules/user-model` )
const Chat = require( `./../../_molecules/chat-model` )
const Message = require( `./../../_molecules/message-model` )
const Question = require( `./../../_molecules/question-model` )

const defaultReplyMessage = `Received your message`

const logError = ( err ) => console.log( `Error: `) //console.log( `Error: `, err )
const logSuccess = ( data ) => console.log( `Success: `, data )

const log = (s) => console.log('log: ', s)

const getQuestions = ( list ) => 
  list.map( obj => [ obj.question, obj.response ] )

module.exports = ( io ) => {

  const testFor = {
    echo: require( `./commands/echo` )( bot, io ),
    // start: require( `./commands/start` )( bot, io ),
    // id: require( `./commands/id` )( bot ),
    aula: require( `./commands/aula` )( bot ),
    ask: require( `./commands/ask` )( bot ),
    ask_list: require( `./commands/ask_list` )( bot ),
  }

  // console.log('testFor', testFor)
  const addRegexTo = ( bot, testFor ) => 
    Object.keys( testFor ).reduce( ( acc, cur ) => {
        // console.log('acc, cur', acc, cur)
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
    // addDefaultReplyTo( bot, defaultReplyMessage )
    addRegexTo( bot, testFor )
  }

  start()


  io.on('connection', (socket) => {
    console.log('connected');

    bot.on('message', (msg) => {
      // console.log('bot on msg: ', msg)

      const message = {
        message_id: msg.message_id,
        from: msg.from.id,
        chat: msg.chat.id,
        text: msg.text,
      }
      Message.create( message )
            .then( logSuccess('Message') )
            .catch( logError )

      User.update( { id: msg.from.id }, msg.from, { upsert: true } )
          .then( logSuccess('User') )
          .catch( logError )


      switch( msg.text ) {
        case `/start`: 
          console.log(`/start memooo`)

          Chat.update( { id: msg.chat.id }, msg.chat, { upsert: true } )
              .then( logSuccess('Chat') )
              .catch( logError )

          const chat = msg.chat
          socket.emit('chat:new:from:telegram', msg)
          sendMessageUsing( bot )( ID )( 'Tudo bem?' )
          console.log('mandei Tudo bem? pelo BOT no Telegram')
          socket.emit('message:from:bot:telegram', 'Tudo bem?')
          console.log('mandei Tudo bem? pelo BOT no Dash')

          break
        case `/ask_list`:
          console.log(`/ask_list`, msg) 

          const toSingleQuestion = ( arr, question ) => {
                      socket.emit('message:from:bot:telegram', question[0].replace(/,/g, ``))
                    }
          Question.find({})
                  .then( ( list ) => {
                    console.log('list', list)
                    const questions = getQuestions( list )
                    const questionsToTelegram = questions
                                                  .join(`\n\n`)
                                                  .replace(/,/g, ``)

                    sendMessageFrom( bot, questionsToTelegram )( msg )

                    questions.reduce( toSingleQuestion, [] )
                    
                  })
                  .catch( log )

        default: 
          socket.emit('message:from:chat:telegram', msg.text)
      }

      // if ( msg.text === `/start` ) {
      //   console.log(`/start memooo`)

      //   Chat.update( { id: msg.chat.id }, msg.chat, { upsert: true } )
      //       .then( logSuccess )
      //       .catch( logError )

      //   const chat = msg.chat
      //   socket.emit('chat:new:from:telegram', msg)
      //   sendMessageUsing( bot )( ID )( 'Tudo bem?' )
      //   socket.emit('message:from:bot:telegram', 'Tudo bem?')

      // } else {
      //   // console.log(`msg.text`, msg.text)
      //   socket.emit('message:from:chat:telegram', msg.text)
      // }
    });

    socket.on(  `change:chat:to`, ( id ) => {
      // console.log(`ID antes: `, ID)
      ID = id
      // console.log(`ID depois: `, ID)
    })

    socket.on( 'message', ( msg ) => { 
      // console.log('on message: ', msg)

      socket.emit('message:from:bot:telegram', msg)

      // sendMessageFrom( bot, msg )

      sendMessageUsing( bot )( ID )( msg )


      // bot.sendMessage( ID, msg, { 
      //   remove_keyboard: true,
      //   reply_markup: JSON.stringify({
      //       one_time_keyboard: true
      //   })
      // })
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
