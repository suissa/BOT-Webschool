const HOST = `http://127.0.0.1:3000`
const BOT_URL = `${HOST}/api/bot`
const Model = require('../../../_molecules/question-model');
const find = require('../../../_organelles/find-question')( Model )

const sendMessageFrom = ( bot, reply ) => ( msg ) => //console.log('msg', msg)
  bot.sendMessage( msg.chat.id, reply ) 

const log = (s) => console.log('log: ', s)

const getQuestions = ( list ) => 
  list.map( obj => [ obj.question, obj.response ] ).join(`\n`)

const thisFunction = ( bot, io ) => ( msg, match ) => {

  console.log('msg', msg)
  if ( msg.from.id == `77586615` ) {
    sendMessageFrom( bot, `${BOT_URL}/${msg.chat.id}` )( msg )

    socket.on('message', ( message ) => { 
      console.log('on message echo: ', message)
      sendMessageFrom( bot, message )( msg )
    })

    // MOSTRa todas as perguntas

    // find( {}, msg ).then( ( list ) => {
    //   console.log('list', list)
    //   sendMessageFrom( bot, getQuestions( list ) )( msg )
    // }).catch( log )
  }
}

module.exports = ( bot, io ) => {


  return {
    regex: /\/echo (.+)/,
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