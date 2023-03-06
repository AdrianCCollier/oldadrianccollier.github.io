const gamesBoardContainer = document.querySelector('#gamesboard-container');
const optionContainer = document.querySelector('.option-container')


const flipButton = document.querySelector('#flip-button')

// We retrieved the HTML reference to the player1-ships through the DOM and here we are accessing the ships inside the parent div, and storing them into an array.
// This function allows the user to rotate the ships before they are placed on the board and it does this by first checking the current angle, it traverses the mentioned array and dynamically updates the CSS property of rotate, to either angle 0 or angle 90.
let angle = 0
function rotate() {
  const optionShips = Array.from(optionContainer.children)

  if (angle == 0) {
    angle = 90;
  } else {
    angle = 0;
  } // end else

  optionShips.forEach((optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`))
} // end rotate function

// First event listener, allow the user to click the rotate button to rotate their ships
flipButton.addEventListener('click', rotate)

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
      gameBoardContainer.append(block);
  } // end i loop

  gamesBoardContainer.append(gameBoardContainer);
} // end createMatrixBoard function

createMatrixBoard('white', 'player');
createMatrixBoard('white', 'computer');



// Ship Creation
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  } // end constructor
} // end Ship class 

// Use constructor to make new Ship objects
const destroyer = new Ship('destroyer', 2);
const submarine = new Ship('submarine', 3);
const cruiser = new Ship('cruiser', 3);
const battleship = new Ship('battleship', 4);
const carrier = new Ship('carrier', 5);

// Store them into an array
const ships = [destroyer, submarine, cruiser, battleship, carrier];

let notDropped

function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`#${user} div`);
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === 'player' ? angle === 0: randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);


  // startIndex for players
  let startIndex = startId ? startId : randomStartIndex

  let validStart = isHorizontal ? startIndex <= width * width - ship.length 
      ? startIndex : width * width - ship.length :
       startIndex <= width * width - width * ship.length
    ? startIndex
    : startIndex - ship.length * width + width

  let shipBlocks = [];

  for(let i = 0; i < ship.length; i++) {
    if(isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i])
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
    }
  }
  let valid;

  if(isHorizontal) {
    shipBlocks.every((_shipBlock, index) =>
      valid = shipBlocks[0].id % width !== width - 
      (shipBlocks.length - (index + 1))) 
  } else {
    shipBlocks.every((_shipBlock, index) =>
      valid = shipBlocks[0].id < 90 + (width * index + 1))
  }

  const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

  if(valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name)
      shipBlock.classList.add('taken')
    })
  } else {
    if(user === 'computer') addShipPiece(ship)
    if(user === 'player') notDropped = true;
  }

  
} // end addShipPiece

ships.forEach(ship => addShipPiece('computer',ship));





// Drag ships functionality

// we use this variable to keep track of which ship is being dragged, used in our dragStart function to store the event target data
let draggedShip;

// fetch all the ships from the parent container, store them into an array
const optionShips = Array.from(optionContainer.children);

// Iterate through this array and tie our dragStart function into the 'dragstart' event listener
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

// target all player blocks 
const allPlayerBlocks = document.querySelectorAll('#player div');

allPlayerBlocks.forEach(playerBlock => {
  playerBlock.addEventListener('dragover', dragOver);
  playerBlock.addEventListener('drop', dropShip);
})

function dragStart(e) {
  notDropped = false;
  draggedShip = e.target;
}


function dragOver(e) {
  e.preventDefault();
}

function dropShip(e) {
  const startId = e.target.id;
  const ship = ships[draggedShip.id]
  addShipPiece('player',ship, startId);
  if(!notDropped) {
    draggedShip.remove();
  }
}