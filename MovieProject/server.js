const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://adrianc:toaster9@cluster0.ggpiko2.mongodb.net/test',
  {
    useNewUrlParser: true,
  }
)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(3000, () => console.log('Listening on Server: 3000'))
