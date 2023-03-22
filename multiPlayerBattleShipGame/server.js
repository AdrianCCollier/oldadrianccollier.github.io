// Import express library, to create a web server easily
const express = require('express');

// Create an instance of the express app
const app = express();

// Import http library to create an http server
const http = require('http');
const server = http.createServer(app)

// Import socket library and create socket.io server, passing in http instance
const socketio = require('socket.io');
const io = socketio(server);

// Constant value for port that server will be running on
const PORT = 3000;

// Set static folder with express
app.use(express.static((__dirname, "public")));

// Start the server
server.listen(PORT, () => { 
  console.log(`Server listening on port: ${PORT}`)
});

// Handle a max of 2 socket connection requests from game.js
// this array will be used to store the player index generated from the for loop
const connections = [null, null];

// When a player connects, this event will be triggered and a player number will be generated for them
io.on('connection', socket => {
  // console.log('new connection made');

  // The for loop will only traverse and assign through [0,1]
  // Assign either 0 or 1
  // so -1 indicates that the game is already full (player 3 or above)
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    };
  };

  // Tell the connecting client what player number they are
  socket.emit('player-number', playerIndex);

  console.log(`Player ${playerIndex} has connected`);

  // Let player 3 know that the game is already full 
  if (playerIndex === -1) {
    console.log('Game is already full, sorry');
    return;
  } // end if 

  // Once a player connects, set their ready status to false by default, this will change to true once they have placed their ships and have actually started the game
  connections[playerIndex] = false;

  // Tell everyone which player number just connected with broadcast
  socket.broadcast.emit('player-connection', playerIndex);

  // Handle when a player disconnects, empty their index
  socket.on('disconnect', () => {
    console.log(`Player ${playerIndex} disconnected`);
    connections[playerIndex] = null;
    //Tell everyone what player number just disconnected
    socket.broadcast.emit('player-connection', playerIndex);
  });

  // Listen for when a client has pressed
  socket.on('player-ready', () => {
    socket.broadcast.emit('player2-ready', playerIndex);
    connections[playerIndex] = true;
  })

  // Check player connections
  socket.on('check-players', () => {
    const players = [];
    for (const i in connections) {
      connections[i] === null ? players.push({connected: false, ready: false}) : players.push({connected: true, ready: connections[i]});
    } // end for 
    socket.emit('check-players', players);
  })

  // On Fire Received
  socket.on('fire', id => {
    console.log(`Shot fired from ${playerIndex}`, id);

    // Emit the move to the other player
    socket.broadcast.emit('fire', id);
  });

  // on Fire Reply
  socket.on('fire-reply', grid => {
    console.log(grid);

    // Forward the reply to the other player
    socket.broadcast.emit('fire-reply', grid);
  });
});