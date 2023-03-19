const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

// Handle only 2 connections for two players
const connections = [null, null]

// Handling socket connection from client
io.on('connection', (socket) => {
  let playerIndex = -1
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i
      break
    }
  }

  // Tell connecting client what player number they are
  socket.emit('player-number', playerIndex)

  console.log(`player ${playerIndex} has connected`)

  // Ignore third player
  if (playerIndex === -1) return

  connections[playerIndex] = false

  // Tell everyone what player number just connected
  socket.broadcast.emit('player-connection', playerIndex)

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} disconnected`)
    connections[playerIndex] = null

    // Tell everyone what player number just disconnected
    socket.broadcast.emit('player-connection', playerIndex)
  })

  // On ready
  socket.on('player-ready', () => {
    socket.broadcast.emit('enemy-ready', playerIndex)
    connections[playerIndex] = true
  })

  // Check players connections
  // This is to know if there are any other players ready when you connect, this is done by looping through the connections array, if it is null then we emit that status, otherwise, we emit that there is someone else there, with their object data
  socket.on('check-players', () => {
    const players = [];
    for(const i in connections) {
      if(connections[i] === null) {
        players.push({connected: false, ready: false});
      }
      else {
        players.push({connected: true, ready: connections[i]});
      }
    } // end for 
    socket.emit('check-players', players);
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/battleshipGame.html')
}) // end app get

server.listen(PORT, () => {
  console.log('Server-side: Server is running on Port: ' + PORT)
})
