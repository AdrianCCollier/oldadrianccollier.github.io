// const http = require('http')
// const fs = require('fs')
// const port = 3000;

// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' })
//   fs.readFile('index.html', function (error, data) {
//     if (error) {
//       res.writeHead(404)
//       res.write('Error: File Not Found')
//     } else {
//       res.write(data)
//     }
//     res.end()
//   })
// })

// server.listen(port, function (error) {
//   if (error) {
//     console.log('something went wrong', error)
//   } else {
//     console.log(`Server listening on ${port}`)
//   }
// })
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000; 

app.get('/api/contacts', (req, res) => {
res.send('get all contacts')
res.json({message: "get all contacts"});
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`) 
});
