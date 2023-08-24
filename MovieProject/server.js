const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const PORT = 3000;
const Movie = require('./models/movie');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Successfully connected to Database'));

// setting up routes
app.use(express.json());

// properly parse form data
app.use(express.urlencoded({extended: true }));

// set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const moviesRouter = require('./routes/movies')

app.use('/movies', moviesRouter);

// serve simple html form at path /upload to allow entry of a new document into mongodb collection using HTTP post request
app.get('/upload', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/list', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('list', { movies: movies });
  } catch(error) {
    console.error(error);
    res.status(500).send('Error: Unable to fetch movies.');
  }
});

app.get('/query', (req, res) => {
  res.render('query');
});

// listen to server
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
