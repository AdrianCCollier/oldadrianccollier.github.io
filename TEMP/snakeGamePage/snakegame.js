



// Get a reference to the canvas element
var canvas = document.getElementById('game')

// Get a reference to the canvas context
var context = canvas.getContext('2d')

// get a reference to the restart button
var restartButton = document.getElementById('restart-button')

// var homeButton = document
//   .getElementById('home-button')
//   .addEventListener('click', function () {
//     console.log('home button clicked')
//   })

// draw border
context.strokeRect(10, 10, 100, 50)

// class to generate more snake parts
class SnakePart {
  // constructor
    constructor(x, y) {
    this.x = x
    this.y = y
    }
}

// define snake speed
let speed = 7;

// used to represent that there's 20 tiles across and 20 tiles down
let tileCount = 20;

// define the size of each individual tile so that food doesn't take up so much space
let tileSize = canvas.width / tileCount - 2

// defing where snake first appears, 10,10 starting from 0,0
let headX = 10
let headY = 10

// array to keep track of snake parts
const snakeParts = []

let tailLength = 2

// define where apple first appears
let appleX = 5
let appleY = 5

// tied to event listeners, used to change direction
let xVelocity = 0
let yVelocity = 0

// define our game score
let score = 0

// define sounds
const biteSound = new Audio('/assets/sounds/appleBite.mp3')

const gameOverSound = new Audio('/assets/sounds/gameOverSound.mp3')

// call additional functions and refresh canvas 1000 milliseconds / defined speed
// changeSnakePosition() must be called first in order to maintain game over logic consistent. Check if any collisions have occurred, if they have, don't call the other functions, just call game over
function drawGame() {
  changeSnakePosition()
  let gameOver = isGameOver()
  if (gameOver == true) {
    return
  }
  clearScreen()

  checkAppleCollision()
  drawApple();
  drawSnake()
  drawScore()
  console.log('drawing... ')
  setTimeout(drawGame, 1000 / speed)
}

// clear the screen and draw black canvas
function clearScreen() {
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.clientWidth, canvas.height)
}

// draw our snake, accomplish this by defining its color and filling a rectangle with the snake attributes
function drawSnake() {
  // Set the shadow color to white
  context.shadowColor = 'white'

  // Set the shadow blur to a large value to create a strong glow effect
  context.shadowBlur = 3

  // Set the shadow offset to 0
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0

  tileSize = 15
  context.fillStyle = 'white'
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i]
    context.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
  } // end for

  // put a new snake part at the end of the list
  // remove the further item from the snake parts if more than current  tail length
  snakeParts.push(new SnakePart(headX, headY))
  while (snakeParts.length > tailLength) {
    snakeParts.shift()
  }
  // placed here so that the head always appears first when refreshing
  context.fillStyle = 'white'
  context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

  // Set up some variables to control the googly eye effect
  const eyeSize = 3.9
  const irisSize = 2
  const wobbleAmplitude = 0.3
  const wobbleFrequency = 0.01
  const wobblePhase = Date.now() * wobbleFrequency

  // Draw the left googly eye
  context.beginPath()
  context.arc(
    headX * tileCount + 5 + Math.sin(wobblePhase) * wobbleAmplitude,
    headY * tileCount + 4.7,
    eyeSize,
    0,
    2 * Math.PI
  )
  context.fillStyle = 'white' // Change the fill color to white
  context.fill()
  context.strokeStyle = 'black' // Set the stroke color to black
  context.lineWidth = 1 // Set the line width to 1 pixel
  context.stroke() // Stroke the eye to add a border

  // Draw the left iris
  context.beginPath()
  context.arc(
    headX * tileCount + 5 + Math.sin(wobblePhase) * wobbleAmplitude,
    headY * tileCount + 5,
    irisSize,
    0,
    2 * Math.PI
  )
  context.fillStyle = 'black'
  context.fill()

  // Draw the right googly eye
  context.beginPath()
  context.arc(
    headX * tileCount + 10 + Math.sin(wobblePhase + Math.PI) * wobbleAmplitude,
    headY * tileCount + 4.5,
    eyeSize,
    0,
    2 * Math.PI
  )
  context.fillStyle = 'white' // Change the fill color to white
  context.fill()
  context.strokeStyle = 'black' // Set the stroke color to black
  context.lineWidth = 1 // Set the line width to 1 pixel
  context.stroke() // Stroke the eye to add a border

  // Draw the right iris
  context.beginPath()
  context.arc(
    headX * tileCount + 10 + Math.sin(wobblePhase + Math.PI) * wobbleAmplitude,
    headY * tileCount + 5,
    irisSize,
    0,
    2 * Math.PI
  )
  context.fillStyle = 'black'
  context.fill()
}

function drawApple() {
    context.beginPath();
    context.arc(appleX * tileCount +
    tileCount / 2, appleY * tileCount + tileCount / 2,
    tileCount / 2 - 2, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    }

function isGameOver() {
  let gameOver = false

  if (yVelocity === 0 && xVelocity === 0) return false
  // self collision detection
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i]
    if (part.x === headX && part.y === headY) {
      gameOver = true
      break
    } // end if
  } // end for

  // check wall collisions
  if (headX < 0) {
    gameOver = true
  } else if (headX === tileCount) {
    gameOver = true
  } else if (headY < 0) {
    gameOver = true
  } else if (headY === tileCount) {
    gameOver = true
  }

  if (gameOver) {
    restartButton.style.display = 'block'
  } else {
    restartButton.style.display = 'none'
  }
  restartButton.addEventListener('click', function () {
    gameOver = false
    console.log('restart button clicked')
    restartGame()
  })

  if (gameOver) {
    context.fillStyle = 'white'
    context.font = '50px Verdana'

    var gradient = context.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop('0', 'magenta')
    gradient.addColorStop('0.5', 'blue')
    gradient.addColorStop('1.0', 'red')

    context.fillStyle = gradient

    context.fillText('Game Over', canvas.width / 6.5, canvas.height / 2.1)
    gameOverSound.play()
    console.log('game ended')
  } // end if game over

  return gameOver
} // end isGameOver

function restartGame() {
  console.log('restartGame function reached')

  window.location.reload()
} // end restartGame

function drawScore() {
  context.fillStyle = 'white'
  context.font = '10px Verdana'
  context.fillText('Score ' + score, canvas.width - 50, 10)
}

// if collision happens, randomize new apple, increment speed,tail
function checkAppleCollision() {
  if (appleX == headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount)
    appleY = Math.floor(Math.random() * tileCount)
    score++
    speed++
    tailLength++
    biteSound.play()
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity
  headY = headY + yVelocity
}

// enable event listener connection to keys for snake control
document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
  // up, with built in guards to allow invalid movement
  if (event.keyCode == 38) {
    if (yVelocity == 1) return
    yVelocity = -1
    xVelocity = 0
  }

  // down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return
    yVelocity = 1
    xVelocity = 0
  }

  // left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return
    yVelocity = 0
    xVelocity = -1
  }

  // right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return
    yVelocity = 0
    xVelocity = 1
  }
}

// start game
drawGame()
