
const game = document.querySelector('.game');
const info = document.querySelector('.info');
const restartButton = document.querySelector('.restart-game')
const startCells = [
    "", "", "", "", "", "", "","", ""
]

let go = "circle";
info.textContent  = "circle goes first"
function createBoard() {
    startCells.forEach((_cell, index) => {
        const block = document.createElement('div')
        block.classList.add('block')
        block.id = index;
        block.addEventListener('click', addGo);
        game.append(block)
    })
}

createBoard();

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay);
    go = go === "circle" ? "cross" : "circle"
    info.textContent = "It is now " + go + "'s go."

    // can't click on same block again
    e.target.removeEventListener('click', addGo);
    checkScore();
}

function checkScore() {
  const allBlocks = document.querySelectorAll('.block')
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  let filledCells = 0

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allBlocks[cell].firstChild?.classList.contains('circle')
    )

    if (circleWins) {
      info.textContent = 'Circle Wins!'
      allBlocks.forEach((square) => square.replaceWith(square.cloneNode(true)))
      document.querySelector('.restart-game').style.visibility = 'visible'
          restartButton.addEventListener('click', resetGame)

    }
  })

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allBlocks[cell].firstChild?.classList.contains('cross')
    )

    if (crossWins) {
      info.textContent = 'Cross Wins!'
      allBlocks.forEach((square) => square.replaceWith(square.cloneNode(true)))
      document.querySelector('.restart-game').style.visibility = 'visible'
          restartButton.addEventListener('click', resetGame)

    }
  })

  allBlocks.forEach((block) => {
    if (block.firstChild) {
      filledCells += 1
    }
  })

  if (
    filledCells === 9 &&
    info.textContent !== 'Circle Wins!' &&
    info.textContent !== 'Cross Wins!'
  ) {
    info.textContent = "It's a draw!"
    document.querySelector('.restart-game').style.visibility = 'visible'
    restartButton.addEventListener('click', resetGame);
  }
}

function resetGame() {
    console.log('game reset');

    startCells.fill('')
    
    while(game.firstChild) {
        game.firstChild.remove();
    }

    createBoard();

    go = 'circle';
    info.textContent = 'circle goes first';

    restartButton.style.visibility - 'hidden';
}