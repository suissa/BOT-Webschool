var express = require('express');
var router = express.Router();
const request = require( `request-promise` )
const id = `77586615`
// webschoolBot.start()

module.exports = ( io ) => {

  const webschoolBot = require('./webschool.bot')( io );

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');

    // const cb = d => {
    //   console.log('then', d)
    //   return webschoolBot.bot.getUpdates().then(cb)
    // }
    // webschoolBot.bot.getUpdates().then(cb)

  });

  // router.get('/myid', function(req, res, next) {
  //   webschoolBot.sendMessage( id )( req.query.msg )
  // });

  router.get('/:id', function(req, res, next) {
    const id = req.params.id || `77586615`
    const reply = req.query.msg || `oieee`
    webschoolBot.sendMessage( id )( reply )
    res.send('msg enviada para o Telegram');
  });



  return router
}
