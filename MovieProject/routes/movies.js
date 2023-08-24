const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

// GET route
router.get('/', async (req, res) => {
  try {
    const query = {}
    if (req.query.minRating) {
      query.rating = { $gte: Number(req.query.minRating) }
    }
    const movies = await Movie.find(query).sort({ rating: 1 })
    res.send(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST route
router.post('/movie', async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    releaseDate: req.body.releaseDate,
    rating: req.body.rating,
  })

  try {
    const newMovie = await movie.save()
    res.status(201).json(newMovie)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router;
