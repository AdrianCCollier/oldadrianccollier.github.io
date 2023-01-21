const router = require('express').Router()
let Exercise = require('../models/exercise.model')

router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const description = req.body.description
  const duration = Number(req.body.duration)
  const date = Date.parse(req.body.date)

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  })

  newExercise
    .save()
    .then(() => res.json('Exercise added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// /:id a mongodb object automatically created
// going to, localhost:5000/exercises/{id} A get request will return data about that specific exercise
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// delete request by id, works the same
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// update request by id
// first find the exercise you are targeting, then update it
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username
      exercise.description = req.body.description
      exercise.duration = Number(req.body.duration)
      exercise.date = Date.parse(req.body.date)

      exercise
        .save()
        .then(() => res.json('Exercise updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
