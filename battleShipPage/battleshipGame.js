const gamesBoardContainer = document.querySelector('#gamesboard-container');
const optionContainer = document.querySelector('.player1-ships')


const flipButton = document.querySelector('#player1-rotate-button')

// We retrieved the HTML reference to the player1-ships through the DOM and here we are accessing the ships inside the parent div, and storing them into an array.
// This function allows the user to rotate the ships before they are placed on the board and it does this by first checking the current angle, it traverses the mentioned array and dynamically updates the CSS property of rotate, to either angle 0 or angle 90.
let angle = 0
function rotate() {
  const shipsP1 = Array.from(shipsPlayerOne.children)

  if (angle == 0) {
    angle = 90
  } else {
    angle = 0
  } // end else

  shipsP1.forEach((ship) => (ship.style.transform = `rotate(${angle}deg)`))
} // end rotate function

// First event listener, allow the user to click the rotate button to rotate their ships
rotateButtonPlayerOne.addEventListener('click', rotate)

const width = 10

// this function dynamically creates an N*N Matrix of cell divs
// this allows to specify and remember the exact coordinates of where
// a ship was dropped, and we can later check if a ship has been hit
function createMatrixBoard(color, user) {
  const gameBoardContainer = document.createElement('div');
  gameBoardContainer.classList.add('game-board');
  gameBoardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  for (let i = 0; i < width * width; i++) {
      const block = document.createElement('div');
      block.classList.add('block');
      block.id = i;
      gameBoard.append(gameBoardContainer);
  } // end i loop
} // end createMatrixBoard function

createMatrixBoard('black', 'player');
createMatrixBoard('red', 'computer');


// Ship Creation
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  } // end constructor
} // end Ship class 

// Use constructor to make new Ship objects
const submarine = new Ship('submarine', 3);
const destroyer = new Ship('destroyer', 2);
const cruiser = new Ship('cruiser', 3);
const battleship = new Ship('battleship', 4);
const carrier = new Ship('carrier', 5);

// Store them into an array
const ships = [submarine, destroyer, cruiser, battleship, carrier];

// Drag ships functionality
let draggedShip;

const optionShips = Array.from(shipsPlayerOne.children);
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

// This function fetches the target of the event listener target
// In this case, we are getting the children of the parent container
// player1-ships, which contains all ships, and we stored them into an array optionShips. By iterating through this array we can call our
// dragStart function to fetch the 
function dragStart(e) {
  draggedShip = e.target;
  console.log(draggedShip)
}
