const player1SelectionBoard = document.getElementById("player1-selection-board");

const player1SelectionPanel = document.getElementById("player1-selection-ships");

// initialize the selected ship to null to avoid future bugs
let selectedShip = null;

const gridSize = 10;

// Here, we use a simple nested for loop to create our 10x10 grid and append it to our game board
for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        player1SelectionBoard.appendChild(cell);
    } // end i loop
} // end j loop


player1SelectionPanel.addEventListener("dragstart", function(event){
    selectedShip = event.target.id;
});


// ensure that once the ship is no longer being dragged, reset to null
player1SelectionPanel.addEventListener("dragend", function(event) {
    selectedShip = null;
});



// Our function to know which ship has been clicked
player1SelectionPanel.addEventListener("click", function(event) {
    if(event.target.classList.contains("submarine")) {
        selectedShip = "submarine";
        console.log(selectedShip);
    } else if (event.target.classList.contains("carrier")) {
        selectedShip = "carrier";
        console.log(selectedShip);
    } else if(event.target.classList.contains("destroyer")) {
        selectedShip = "destroyer";
        console.log(selectedShip);
    } else if(event.target.classList.contains("cruiser")) {
        selectedShip = "cruiser";
        console.log(selectedShip);
    } else if(event.target.classList.contains("battleship")) {
        selectedShip = "battleship";
        console.log(selectedShip);
    }
});

// Handle drag and drop of ship onto the board
player1SelectionBoard.addEventListener("dragover", function(event) {
    event.preventDefault();
});

player1SelectionBoard.addEventListener("drop", function(event) {
    event.preventDefault();
    const targetCell = event.target;
    if(targetCell.classList.contains("cell")) {
        targetCell.appendChild(document.getElementById(selectedShip));
    } // end if 
});










// Worry about this later
// const player1Board = document.getElementById('player1-board')
// const player2Board = document.getElementById('player2-board')
// // Here, we use a simple nested for loop to create our 10x10 grid and append it to our game board
// for(let i = 0; i < gridSize; i++) {
//     for(let j = 0; j < gridSize; j++) {
//         const cell = document.createElement("div");
//         cell.classList.add("cell");
//         player1Board.appendChild(cell);
//         player2Board.appendChild(cell.cloneNode()); // Clone our cell for board 2
//     } // end j loop
// } // end i loop