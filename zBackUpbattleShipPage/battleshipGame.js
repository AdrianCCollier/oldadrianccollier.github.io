// this container will hold both of our game boards, we are accessing this DOM reference in our for loop to create the matrices
const gamesBoardContainer = document.querySelector('#gamesboard-container');

// this DOM reference will allow us to later get all its children (ship divs stored inside)
const optionContainer = document.querySelector('.option-container')

// buttons and display DOM references
const flipButton = document.querySelector('#flip-button');
const startButton = document.querySelector('#start-button');
const infoDisplay = document.querySelector('#info');
const turnDisplay = document.querySelector('#turn-display');

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

const width = 10;

// this function dynamically creates an N*N Matrix of cell divs
// this allows to specify and remember the exact coordinates of where
// a ship was dropped, and we can later check if a ship has been hit
// a game-board div is created and added to our container, from here we can
// append the blocks to the game-boards.
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



// Simple class to make our ships with a name and length
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

// boolean later used in our drag and drop event listeners
let notDropped;

// a function to add blocks, we start by getting access to all the blocks of the player's board, 
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

  // to add a piece, we iterate through the entire ship length and if horizontal we simply have to worry about the blocks to the right,
  // otherwise if vertical then we push the blocks 10 units ahead, for example, we are pushing a carrier size 5 at location 25, then
  // 25 + 5 * 10, we end up covering blocks 25,35,45,55,65, which makes a vertical line.
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
    if(user === 'computer') addShipPiece(user, ship, startId)
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

// Game logic

let gameOver = false;
let playerTurn = undefined;

// Start Game
function startGame() {

  if(playerTurn === undefined) {

     // only start game if all ships have been placed
  
  if(optionContainer.children.length != 0) {
    infoDisplay.textContent = 'Please place all your pieces first!';
  }
  else {
    const allBoardBlocks = document.querySelectorAll('#computer div')
    allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
    playerTurn = true;
    turnDisplay.textContent = 'Your turn!';
    infoDisplay.textContent = 'The game has started!';
  }
  

  }
  
  
 
}
// trigger startGame function when clicking start button
startButton.addEventListener('click', startGame);

let playerHits = [];
let computerHits = [];
const playerSunkShips = [];
const computerSunkShips = [];

function handleClick(e) {
   if(!gameOver) {
    // if we click on a cell that is marked as taken, we have hit a ship
    if(e.target.classList.contains('taken')) {
      e.target.classList.add('boom')
      infoDisplay.textContent = 'You hit a ship!'

      // used to filter the class name from each ship, used to keep track of how many hits each ship has taken, stored in array
      let classes = Array.from(e.target.classList);
      classes = classes.filter(className => className !== 'block');
      classes = classes.filter(className => className !== 'boom');
      classes = classes.filter(className => className !== 'taken');
      playerHits.push(...classes);
      checkScore('player', playerHits, playerSunkShips);


    } // end if 
    // If we haven't hit a ship
    if(!e.target.classList.contains('taken')) {
      infoDisplay.textContent = 'Nothing his this time';
      e.target.classList.add('empty');
    }
    // handle computer turn here
    playerTurn = false;
    const allBoardBlocks = document.querySelectorAll('#computer div');
    allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true)))
    setTimeout(computerGo, 3000);
   } // end if 
} // end handeClick

// Computer's turn
function computerGo() {
  if(!gameOver) {
    turnDisplay.textContent = 'Computers turn';
    infoDisplay.textContent = 'The Computer is thinking...'

    setTimeout(() => {
      // this guesses from 0 to 100
      let randomGo = Math.floor(Math.random() * width * width);

      // target player's divs
      const allBoardBlocks = document.querySelectorAll('#player div');

      // if computer picks a block that is labeled taken and boom, then make it go again
      if(allBoardBlocks[randomGo].classList.contains('taken') &&
         allBoardBlocks[randomGo].classList.contains('boom')) {
          computerGo();
          return;

      } else if(
              allBoardBlocks[randomGo].classList.contains('taken') &&
              !allBoardBlocks[randomGo].classList.contains('boom')) {
                  allBoardBlocks[randomGo].classList.add('boom');
                  infoDisplay.textContent = 'The computer hit your ship';

                  let classes = Array.from(allBoardBlocks[randomGo].classList);
                  classes = classes.filter(className => className !== 'block');
                  classes = classes.filter(className => className !== 'boom');
                  classes = classes.filter(className => className !== 'taken');
                  computerHits.push(...classes);
                  checkScore('computer', computerHits, computerSunkShips);
      } else {
        infoDisplay.textContent = 'Nothing hit this time';
        allBoardBlocks[randomGo].classList.add('empty');
      }

    }, 3000)
    // back to the player's turn
    setTimeout(() => {
      playerTurn = true;
      turnDisplay.textContent = 'Your go';
      infoDisplay.textContent = 'Please take your go';
      const allBoardBlocks = document.querySelectorAll('#computer div');

      allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
    }, 6000)
  }
}

function checkScore(user, userHits, userSunkShips) {



  function checkShip(shipName, shipLength) {
    if(userHits.filter(storedShipName => storedShipName === shipName).length === shipLength) {
            infoDisplay.textContent = `you sunk the ${user}'s ${shipName}`;

            // convert playerHits into ships sunk, filter ship name from array if ship is
            if(user === 'player') {
              playerHits = userHits.filter(storedShipName => storedShipName !== shipName);
            } // end if
            if(user === 'computer') {
              computerHits = userHits.filter(storedShipName => storedShipName !== shipName);
            } // end if 
            userSunkShips.push(shipName);
   } // end if 
} // end function checkShip
  checkShip('destroyer', 2);
  checkShip('submarine', 3);
  checkShip('cruiser', 3);
  checkShip('battleship', 4);
  checkShip('carrier', 5);

  console.log('player hits', playerHits);
  console.log('player sunk ships', playerSunkShips);

  if(playerSunkShips.length === 5) {
    infoDisplay.textContent = 'You sunk all the computers ships. You WON!';
    gameOver = true;
  } // end if 
  if(computerSunkShips.length === 5) {
    infoDisplay.textContent = 'The computer has sunk all your ships. You LOST!'
    gameOver = true;
  } // end if 

} 