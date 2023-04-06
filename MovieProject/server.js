const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// setting up routes
app.use(express.json())

const moviesRouter = require('./routes/movies')

app.use('/movies', moviesRouter)

// listen to server
app.listen(3000, () => console.log('Listening on Server: 3000'))
