const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const socket = require('socket.io')
const mongo = require('./_config/mongodb')
const app = express()

const bot = require( `./modules/bot/routes` )
const questions = require( `./modules/question/routes` )

const jwt = require('./_config/jwtConfig')(express, app)

app.set('superSecret', '1a5H(qzO&1+!8M35tXvai3A*JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
//app.use(express.static(path.join(__dirname, '/public')))

app.use('/api/users', jwt)
app.use('/api/bot', bot)
app.use('/api/questions', questions)

const port = 3000

require('./routes')(app)

app.use((req, res, next)=>{
  res.status(404).json({error: 'Route not found'})
})

const server = http.createServer(app)

const io = socket.listen(server)

// io.engine.ws = new (require('uws').Server)({
//     noServer: true,
//     clientTracking: false,
//     perMessageDeflate: false
// })


io.on('connection', (socket) => {
  console.log('connected');


  // console.log(' Client connected from Server HTTP')
  // clientSockets.push(socket)
  // if (++id > 1) socket.name = socketType
  // console.log(' Count clients connected = ' + id)

  socket.on('message', ( msg ) => { 
    console.log('on message: ', msg)
  })

  socket.emit('message', ( msg ) => { 
    console.log('emit message: ', msg)
  })

  socket.on('disconnect', () => { 
    console.log(' Client disconnect from Server HTTP')
    console.log(' Count clients connected = ' + (--id))
  })
  socket.on('error', (err) => console.log(' Server HTTP Error: ' + err.message))


  socket.on('disconnect', () => {
      console.log('disconnected');
  });
});

// require('./_quarks/socket-io')(io)

server.listen(3000, () => console.log(`Init Server to port: ${port} `))