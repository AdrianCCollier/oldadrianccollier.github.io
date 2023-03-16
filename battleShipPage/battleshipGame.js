

// this container will hold both of our game boards, we are accessing this DOM reference in our for loop to create the matrices
// we use JS to change the dom by appending two game boards to this container
const gameContainer = document.querySelector('#game-container');

// this DOM reference will allow us to later get all its children (ship divs stored inside)
const shipContainerP1 = document.querySelector('#player1-ships');
const shipContainerP2 = document.querySelector('#player2-ships');

// buttons and display DOM references
const rotateButton = document.querySelector('#rotate-button');
const startButton = document.querySelector('#start-button');
const infoDisplay = document.querySelector('#info');
const turnDisplay = document.querySelector('#turn-display');

// We retrieved the HTML reference to the player1-ships through the DOM and here we are accessing the ships inside the parent div, and storing them into an array.
// This function allows the user to rotate the ships before they are placed on the board and it does this by first checking the current angle, it traverses the mentioned array and dynamically updates the CSS property of rotate, to either angle 0 or angle 90.
let angle = 0;
function rotate() {
  const optionShips = Array.from(shipContainerP1.children);

  if (angle == 0) {
    angle = 90;
  } else {
    angle = 0;
  } // end else

  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)
  )
} // end rotate function

// Function for Player 2, same method
let angleP2 = 0
function rotateP2() {
  const optionShipsP2 = Array.from(shipContainerP2.children);

  if (angleP2 == 0) {
    angleP2 = 90;
  } else {
    angleP2 = 0;
  }
  optionShipsP2.forEach((optionShipP2) => (optionShipP2.style.transform = `rotate(${angleP2}deg)`))
}

// First event listener, allow the user to click the rotate button to rotate their ships
rotateButton.addEventListener('click', function () {
  rotate();
  rotateP2();
})

const width = 10;

// this function dynamically creates an N*N Matrix of cell divs
// this allows to specify and remember the exact coordinates of where
// a ship was dropped, and we can later check if a ship has been hit
// a game-board div is created and added to our container, from here we can
// append the blocks to the game-boards.
function createMatrixBoard(color, user) {
  const gameBoardContainer = document.createElement('div');
  gameBoardContainer.classList.add('game-board');

  // uses JS to dynamically change element styling
  // we are using the color parameter to pass in a color when the user calls this function
  gameBoardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  for (let i = 0; i < width * width; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = i;
    gameBoardContainer.append(block);
  } // end i loop

  gameContainer.append(gameBoardContainer)
} // end createMatrixBoard function

createMatrixBoard('blue', 'player');
createMatrixBoard('blue', 'player2');


// Simple class to make our ships with a name and length
class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
  } // end constructor
} // end Ship class

// Use constructor to make new Ship objects
const destroyer = new Ship('destroyer', 2)
const submarine = new Ship('submarine', 3)
const cruiser = new Ship('cruiser', 3)
const battleship = new Ship('battleship', 4)
const carrier = new Ship('carrier', 5)

// Same for Player 2
const destroyerP2 = new Ship('destroyer', 2)
const submarineP2 = new Ship('submarine', 3)
const cruiserP2 = new Ship('cruiser', 3)
const battleshipP2 = new Ship('battleship', 4)
const carrierP2 = new Ship('carrier', 5)

// Store them into an array
const ships = [destroyer, submarine, cruiser, battleship, carrier];

const shipsP2 = [destroyerP2, submarineP2, cruiserP2, battleshipP2, carrierP2];

// boolean later used in our drag and drop event listeners
let notDropped;
let notDroppedP2;

// a function to add blocks, we start by getting access to all the blocks of the player's board,
function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`#${user} div`)
  let isHorizontal = angle === 0;


  // startIndex for players
  let startIndex;

  if (startId) {
    startIndex = startId;
  } 

  // used to later determine if we can actually place a ship here
  let validStart;


  if (isHorizontal) {
     // If the ship fits within the row, set the starting index to the input value
    if (startIndex <= width * width - ship.length) {
      validStart = startIndex;
    } else {
       // If the ship doesn't fit, adjust the starting index so that the ship fits within the row
      validStart = width * width - ship.length;
    }
  } else {
     // If the ship fits within the column, set the starting index to the input value
     validStart = startIndex;
    if (startIndex <= width * width - width * ship.length) {
      validStart = startIndex;
    } else {
       // If the ship doesn't fit, adjust the starting index so that the ship fits within the column
      validStart = startIndex - ship.length * width + width;
    }
  }

  let shipBlocks = []

  // to add a piece, we iterate through the entire ship length and if horizontal we simply have to worry about the blocks to the right,
  // otherwise if vertical then we push the blocks 10 units ahead, for example, we are pushing a carrier size 5 at location 25, then
  // 25 + 5 * 10, we end up covering blocks 25,35,45,55,65, which makes a vertical line.
  for (let i = 0; i < ship.length; i++) {
    // if we are horizontal
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i])
      // if we are vertical
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width])
    }
  }

  let valid;

  if (isHorizontal) {
    // If the ship is horizontal, check that every block is in the same row
  // and that there is no gap between them
    shipBlocks.every((_shipBlock, index) => (valid =shipBlocks[0].id % width !== width - (shipBlocks.length - (index + 1))))
  } else {
    // If the ship is vertical, check that every block is in the same column
  // and that there is no gap between them
    shipBlocks.every((_shipBlock, index) =>(valid = shipBlocks[0].id < 90 + (width * index + 1)))
  }

  // Check that none of the ship's blocks are already taken by another ship
  const notTaken = shipBlocks.every(
    (shipBlock) => !shipBlock.classList.contains('taken')
  )

// If the ship placement is valid and none of the blocks are taken,
// add the ship's name and 'taken' class to each block
  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name)
      shipBlock.classList.add('taken')
    })
  } else {
    if (user === 'player') notDropped = true
    if (user === 'player2') notDroppedP2 = true
  }
} // end addShipPiece

// Drag ships functionality

// we use this variable to keep track of which ship is being dragged, used in our dragStart function to store the event target data
let draggedShip;
let draggedShipP2;

// fetch all the ships from the parent container, store them into an array
const optionShips = Array.from(shipContainerP1.children)
const optionShipsP2 = Array.from(shipContainerP2.children)

// Iterate through this array and tie our dragStart function into the 'dragstart' event listener
optionShips.forEach((optionShip) =>
  optionShip.addEventListener('dragstart', dragStart)
)

// Same logic
optionShipsP2.forEach((optionShipP2) =>
  optionShipP2.addEventListener('dragstart', dragStartP2)
)

// target all player blocks for both players
const allPlayerBlocks = document.querySelectorAll('#player div')
const allPlayerBlocksP2 = document.querySelectorAll('#player2 div')


// intiate dragover and drop events, html elements are set to draggable=true
allPlayerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener('dragover', dragOver)
  playerBlock.addEventListener('drop', dropShip)
})

allPlayerBlocksP2.forEach((playerBlockP2) => {
  playerBlockP2.addEventListener('dragover', dragOverP2)
  playerBlockP2.addEventListener('drop', dropShipP2)
})

function dragStart(e) {
  notDropped = false;
  draggedShip = e.target
}

function dragStartP2(e) {
  notDroppedP2 = false;
  draggedShipP2 = e.target
}

function dragOver(e) {
  e.preventDefault()
}

function dragOverP2(e) {
  e.preventDefault()
}

function dropShip(e) {
  const startId = e.target.id
  const ship = ships[draggedShip.id]
  addShipPiece('player', ship, startId)
  if (!notDropped) {
    draggedShip.remove()
  }
}

function dropShipP2(e) {
  const startId = e.target.id
  const shipP2 = shipsP2[draggedShipP2.id]
  addShipPiece('player2', shipP2, startId)
  if (!notDroppedP2) {
    draggedShipP2.remove();
  }
}


// Game logic
let gameOver = false;
let player1Turn = undefined;
infoDisplay.textContent = 'Waiting to start the game, both players should now place their ships'


function enablePlayer1Turn() {
  const allBoardBlocksP1 = document.querySelectorAll('#player2 div')
  allBoardBlocksP1.forEach((blockP1) => {
    blockP1.addEventListener('click', handleClick)
    // Highlight Player2's grid cells
    blockP1.classList.add('highlight-board')
  })

  const allBoardBlocksP2 = document.querySelectorAll('#player div')
  allBoardBlocksP2.forEach((blockP2) => {
    // Remove highlight from Player1's grid cells
    blockP2.classList.remove('highlight-board')
  })
}

function enablePlayer2Turn() {
  const allBoardBlocksP2 = document.querySelectorAll('#player div')
  allBoardBlocksP2.forEach((blockP2) => {
    blockP2.addEventListener('click', handleClickP2)
    // Highlight Player1's grid cells
    blockP2.classList.add('highlight-board')
  })

  const allBoardBlocksP1 = document.querySelectorAll('#player2 div')
  allBoardBlocksP1.forEach((blockP1) => {
    // Remove highlight from Player2's grid cells
    blockP1.classList.remove('highlight-board')
  })
}

function disablePlayer1Turn() {
  const allBoardBlocksP1 = document.querySelectorAll('#player2 div');
  allBoardBlocksP1.forEach(blockP1 => blockP1.removeEventListener('click', handleClick));
}

function disablePlayer2Turn() {
  const allBoardBlocksP2 = document.querySelectorAll('#player div');
  allBoardBlocksP2.forEach(blockP2 => blockP2.removeEventListener('click', handleClickP2));
}

// Start Game
function startGame() {
  if(player1Turn === undefined) {

     // only start game if all ships have been placed
     // Here, we use JS to change the text context of our span HTML elements, in our game-info container
  if(shipContainerP1.children.length != 0 || shipContainerP2.children.length != 0) {
    infoDisplay.textContent = 'Please place all your pieces first!';
  }
  else {
    // It's player1's turn, he gets to target player2s board
    enablePlayer1Turn();
    player1Turn = true;
    turnDisplay.textContent = 'Player1s turn!';
    infoDisplay.textContent = 'Attack Player2s board!';
    }
  }
}
// trigger startGame function when clicking start button
startButton.addEventListener('click', startGame);

let playerHits = [];
let player2Hits = [];
const playerSunkShips = [];
const player2SunkShips = [];

function handleClick(e) {
   if(!gameOver && player1Turn) {
    // if we click on a cell that is marked as taken, we have hit a ship
    if(e.target.classList.contains('taken')) {
      e.target.classList.add('boom')
      infoDisplay.textContent = 'You hit player2s ship! Take another shot'

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
      infoDisplay.textContent = 'Nothing hit this time'
      e.target.classList.add('empty')

      // handle player2s turn here
      player1Turn = false;
      disablePlayer1Turn();
      enablePlayer2Turn();
      turnDisplay.textContent = 'Player2s turn'
      infoDisplay.textContent = 'Attack Player1s board'
    } // end if 
   } // end if 
} // end handleClick

function handleClickP2(e) {
  if(!gameOver && !player1Turn) {
    if (e.target.classList.contains('taken')) {
      e.target.classList.add('boom')
      infoDisplay.textContent = 'Player2 hit a ship! Take another shot'

      // used to filter the class name from each ship, used to keep track of how many hits each ship has taken, stored in array
      let classes = Array.from(e.target.classList);
      classes = classes.filter(className => className !== 'block');
      classes = classes.filter(className => className !== 'boom');
      classes = classes.filter(className => className !== 'taken');
      player2Hits.push(...classes);
      checkScore('player2', player2Hits, player2SunkShips);
  } // end actual hit if 
   // If we haven't hit a ship
   if (!e.target.classList.contains('taken')) {
     infoDisplay.textContent = 'Nothing hit this time'
     e.target.classList.add('empty')

     // handle player1's turn here
     player1Turn = true
     disablePlayer2Turn();
     enablePlayer1Turn();
     turnDisplay.textContent = 'Player1s turn!'
     infoDisplay.textContent = 'Attack player2s board!'
   } // end if 
  } // end gameOver if
} // end handleClickP2 function

function checkScore(user, userHits, userSunkShips) {
function checkShip(shipName, shipLength) {

    if(userHits.filter(storedShipName => storedShipName === shipName).length === shipLength) {

            infoDisplay.textContent = `you sunk the ${user}'s ${shipName}`;

            // convert playerHits into ships sunk, filter ship name from array if ship is
            if(user === 'player') {
              playerHits = userHits.filter(storedShipName => storedShipName !== shipName);
            } // end if
            if(user === 'player2') {
              player2Hits = userHits.filter(storedShipName => storedShipName !== shipName);
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

  console.log('player2 hits', player2Hits);
  console.log('player2 sunk ships', player2SunkShips);

  // each side has only 5 battleships, so the first to reach 5 sunken ships wins
  if(playerSunkShips.length === 5) {
    infoDisplay.textContent = 'You sunk all Player2s ships. Game over!';
    gameOver = true;
  } // end if 
  if(player2SunkShips.length === 5) {
    infoDisplay.textContent = 'You sunk all Player1s ships! Game over!'
    gameOver = true;
  } // end if 

} 