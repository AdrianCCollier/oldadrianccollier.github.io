console.log('hello')
// Get a reference to the canvas element
var canvas = document.getElementById('game');

// Get a reference to the canvas context
var context = canvas.getContext('2d');


let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

function drawGame() {
    clearScreen();
    drawSnake();
    console.log('draw game')
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
    context.fillStyle = 'black'
    context.fillRect(0,0,canvas.clientWidth,canvas.height)
}

function drawSnake() {
    ctx.fillStyle = 'green';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

drawGame();