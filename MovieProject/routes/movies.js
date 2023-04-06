const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.send(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Get one movie
router.get('/:id', getMovie, (req, res) => {
  res.json(res.movie)
})

// Create one movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
  })

  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update one movie
// put updates all movie info at once, patch only updates specified input
router.patch('/:id', getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name
  }
  if (req.body.genre != null) {
    res.movie.genre = req.body.genre
  }

  try {
    const updatedMovie = await res.movie.save()
    res.json(updatedMovie)
  } catch (error) {
    res.status(400).json({ message: err.message })
  }
})

// Delete one movie
router.delete('/:id', getMovie, async (req, res) => {
  try {
    await Movie.deleteOne({ _id: res.movie._id })
    res.json({ message: 'Deleted Movie' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware
async function getMovie(req, res, next) {
  let movie
  try {
    movie = await Movie.findById(req.params.id)
    if (movie == null) {
      return res.status(404).json({ message: 'Cannot find movie' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.movie = movie
  next()
}

module.exports = router
