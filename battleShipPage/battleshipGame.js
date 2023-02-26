const player1SelectionBoard = document.getElementById("player1-selection-board");

const player1Board = document.getElementById("player1-board");
const player2Board = document.getElementById("player2-board");

const gridSize = 10;
// Here, we use a simple nested for loop to create our 10x10 grid and append it to our game board
for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        player1SelectionBoard.appendChild(cell);
    }
}


// Here, we use a simple nested for loop to create our 10x10 grid and append it to our game board
for(let i = 0; i < gridSize; i++) {
    for(let j = 0; j < gridSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        player1Board.appendChild(cell);
        player2Board.appendChild(cell.cloneNode()); // Clone our cell for board 2
    } // end j loop
} // end i loop