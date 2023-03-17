const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('Server-side: A user connected: ' + socket.id)

  socket.on('joinGame', () => {
    console.log('Server-side: Received joinGame event')
    socket.emit('joinGameResponse', 'join request from server!')
  })

  socket.on('disconnect', () => {
    console.log('Server-side: A user disconnected: ' + socket.id)
  })
})

app.get('/battleshipGame', (req, res) => {
  res.sendFile(__dirname + '/public/battleshipGame.html')
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('Server-side: Server is running on Port: ' + PORT)
})
