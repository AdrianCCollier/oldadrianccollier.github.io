// import required dependencies
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// create an instance of Express and set up server with http 
const app = express();
const server = http.createServer(app);

// create a socket.io instance attached to server
const io = socketIO(server);
