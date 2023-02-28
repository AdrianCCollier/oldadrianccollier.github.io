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





// DOM reference to HTML
const submarine = document.querySelector("#submarine");


// First event listener, listen for beginning of drag start and prepare to transfer data
submarine.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", submarine.id); // allow for the transfer of elementId
});

// Continously listen for dragover event inside both containers
for(const dropZone of document.querySelectorAll(".drop-zone")) {
    
    // When a ship is over a drop zone
    dropZone.addEventListener("dragover", e => {
        e.preventDefault(); // allow us to actually be able to drop an item
        console.log("dragging.."); // test
        dropZone.classList.add("drop-zone--over") // updates opacity with CSS selector update
    });

// When a ship is no longer over the drop zone
dropZone.addEventListener("dragleave", e => {
    dropZone.classList.remove("drop-zone--over"); // update opacity back to normal by reverting CSS selector
});


// When a ship is dropped onto the drop zone
dropZone.addEventListener("drop", e => {
    e.preventDefault(); // needed for some reason, still don't understand why

    const droppedSubmarineId = e.dataTransfer.getData("text/plain"); // receive the 
    const droppedSubmarine = document.getElementById(droppedSubmarineId);

    dropZone.appendChild(droppedSubmarine);
    dropZone.classList.remove("drop-zone--over");
    console.log(droppedSubmarineId);
});
}









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

// Our function to know which ship has been clicked
// player1SelectionPanel.addEventListener("click", function(event) {
//     if(event.target.classList.contains("submarine")) {
//         selectedShip = "submarine";
//         console.log(selectedShip);
//     } else if (event.target.classList.contains("carrier")) {
//         selectedShip = "carrier";
//         console.log(selectedShip);
//     } else if(event.target.classList.contains("destroyer")) {
//         selectedShip = "destroyer";
//         console.log(selectedShip);
//     } else if(event.target.classList.contains("cruiser")) {
//         selectedShip = "cruiser";
//         console.log(selectedShip);
//     } else if(event.target.classList.contains("battleship")) {
//         selectedShip = "battleship";
//         console.log(selectedShip);
//     }
// });