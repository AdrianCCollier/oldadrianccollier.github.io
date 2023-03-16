const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
// const gameLogic = require('./gameLogic');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// Serve the static battleship files
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Events will happen here

    socket.on('disconnect', () => {
        console.log('A user disconnected: ' + socket.id);
    });

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/battleshipGame.html')
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server is running on Port: ' + PORT);
});