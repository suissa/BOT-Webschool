module.exports = (io)=>{   
  console.log('io', io)
  io.on('connection', (socket) => {
    console.log('connected');


    console.log(' Client connected from Server HTTP')
    clientSockets.push(socket)
    if (++id > 1) socket.name = socketType
    console.log(' Count clients connected = ' + id)

    socket.on('disconnect', () => { 
      console.log(' Client disconnect from Server HTTP')
      console.log(' Count clients connected = ' + (--id))
    })
    socket.on('error', (err) => console.log(' Server HTTP Error: ' + err.message))


    socket.on('disconnect', () => {
        console.log('disconnected');
    });
  });
  
}