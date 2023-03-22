document.addEventListener('DOMContentLoaded', () => {
  const player1Grid = document.querySelector('.grid-player1');
  const player2Grid = document.querySelector('.grid-player2');
  const displayGrid = document.querySelector('.grid-display');
  const ships = document.querySelectorAll('.ship');
  const destroyer = document.querySelector('.destroyer-container');
  const submarine = document.querySelector('.submarine-container');
  const cruiser = document.querySelector('.cruiser-container');
  const battleship = document.querySelector('.battleship-container');
  const carrier = document.querySelector('.carrier-container');
  const startButton = document.querySelector('#start');
  const rotateButton = document.querySelector('#rotate');
  const turnDisplay = document.querySelector('#turn-display');
  const infoDisplay = document.querySelector('#info');
  const setupButtons = document.getElementById('setup-buttons');
  const player1Grids = [];
  const player2Grids = [];
  let isHorizontal = true;
  let isGameOver = false;
  let currentPlayer = 'current-player';
  const width = 10;
  let playerNum = 0;
  let player1Ready = false;
  let player2Ready = false;
  let allShipsPlaced = false;
  let shotFired = -1;

  // It's necessary to create an array of objects to give each ship their own unique dimensions, keep in mind that due to the game boards always being 10x10, and width = 10, I'm using width to dynamically represent 10
  const shipArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width],
      ],
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ]

  // Create Board()
  // This function is responsible for creating the game boards, it does so by iterating through a for loop to dynamically create 100 divs, which are respectively named 0 to 99, they are then appended to the grid.
  // Instead of a single for loop, alternatively I could have used a nested for loop to create the matrix effect on the game board, however I'm using flex-wrap: wrap with flexbox in CSS to achieve the same result here.
  function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    } // end for
  } // end createBoard function

  // Create two game boards for player1, player2
  createBoard(player1Grid, player1Grids)
  createBoard(player2Grid, player2Grids)


  // Multiplayer()
  // This function is responsible for creating the handshake between our server.js file and the connecting clients. We begin by creating a socket.io connection and listening to our server(socket.on() ) or sending data to our server (socket.emit() ), more specific comments below. 
  function startMultiPlayer() {
    // Create socket.io connection to communicate with server
    const socket = io();

    // Listen for the player number that server.js has assigned to us
    socket.on('player-number', (num) => {

      // the for loop in server.js that generates player numbers iterates through [0,1], therefore -1 is used when player 3 tries to join the game
      if (num === -1) {
        infoDisplay.textContent = 'Sorry, the server is full'
      } else {
        // Store playerNum, convert String to int, avoid bugs
        playerNum = parseInt(num)
        
        // Based on the player number that server assigns the client, you are either player1 or player2
        // player1 is set by default
        if (playerNum === 1) currentPlayer = 'player2'

        // console.log(playerNum)

        // Get other player status
        socket.emit('check-players')
      } // end else 
    }); // end player-number listener function


    // Listen for when another player has connected or disconnected
    socket.on('player-connection', (num) => {
      // console.log(`Player number ${num} has connected or disconnected`)
      playerConnect(num)
    }); // end player-connection listener function

    // On player2 ready
    socket.on('player2-ready', (num) => {
      player2Ready = true;
      playerReady(num);
      if (player1Ready) {
        playGameMulti(socket);
        setupButtons.style.display = 'none';
      }
    });

    // Check player status
    socket.on('check-players', (players) => {
      players.forEach((p, i) => {
        if (p.connected) playerConnect(i)
        if (p.ready) {
          playerReady(i)
          if (i !== playerReady) player2Ready = true
        }
      })
    })

    // Ready button click
    startButton.addEventListener('click', () => {
      if (allShipsPlaced) playGameMulti(socket)
      else infoDisplay.innerHTML = 'Please place all ships to start the game.'
    })

    // Setup event listeners for firing
    player2Grids.forEach((square) => {
      square.addEventListener('click', () => {
        if (
          currentPlayer === 'current-player' &&
          player1Ready &&
          player2Ready
        ) {
          shotFired = square.dataset.id
          socket.emit('fire', shotFired)
        }
      })
    })

    // On Fire Received
    socket.on('fire', (id) => {
      player2Turn(id)
      const square = player1Grids[id]
      socket.emit('fire-reply', square.classList)
      playGameMulti(socket)
    })

    // On Fire Reply Received
    socket.on('fire-reply', (classList) => {
      revealSquare(classList)
      playGameMulti(socket)
    })

    function playerConnect(num) {
      let player = `.p${parseInt(num) + 1}`
      document.querySelector(`${player} .connected`).classList.toggle('active')
      if (parseInt(num) === playerNum)
        document.querySelector(player).style.fontWeight = 'bold'
    } // end playerConnect
  } // end startMultiPlayer

   startMultiPlayer();

  //Draw player2's ships in random locations
  function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]
    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * player2Grids.length -
          ship.directions[0].length * direction
      )
    )

    const isTaken = current.some((index) =>
      player2Grids[randomStart + index].classList.contains('taken')
    )
    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % width === width - 1
    )
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    )

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) =>
        player2Grids[randomStart + index].classList.add('taken', ship.name)
      )
    else generate(ship)
  }

  //Rotate the ships
  function rotate() {
    if (isHorizontal) {
      destroyer.classList.toggle('destroyer-container-vertical')
      submarine.classList.toggle('submarine-container-vertical')
      cruiser.classList.toggle('cruiser-container-vertical')
      battleship.classList.toggle('battleship-container-vertical')
      carrier.classList.toggle('carrier-container-vertical')
      isHorizontal = false
      // console.log(isHorizontal)
      return
    }
    if (!isHorizontal) {
      destroyer.classList.toggle('destroyer-container-vertical')
      submarine.classList.toggle('submarine-container-vertical')
      cruiser.classList.toggle('cruiser-container-vertical')
      battleship.classList.toggle('battleship-container-vertical')
      carrier.classList.toggle('carrier-container-vertical')
      isHorizontal = true
      // console.log(isHorizontal)
      return
    }
  }
  rotateButton.addEventListener('click', rotate)

  //move around current-player ship
  ships.forEach((ship) => ship.addEventListener('dragstart', dragStart))
  player1Grids.forEach((square) =>
    square.addEventListener('dragstart', dragStart)
  )
  player1Grids.forEach((square) =>
    square.addEventListener('dragover', dragOver)
  )
  player1Grids.forEach((square) =>
    square.addEventListener('dragenter', dragEnter)
  )
  player1Grids.forEach((square) =>
    square.addEventListener('dragleave', dragLeave)
  )
  player1Grids.forEach((square) => square.addEventListener('drop', dragDrop))
  player1Grids.forEach((square) => square.addEventListener('dragend', dragEnd))

  let selectedShipNameWithIndex
  let draggedShip
  let draggedShipLength

  ships.forEach((ship) =>
    ship.addEventListener('mousedown', (e) => {
      selectedShipNameWithIndex = e.target.id
      // console.log(selectedShipNameWithIndex)
    })
  )

  function dragStart() {
    draggedShip = this
    draggedShipLength = this.childNodes.length
    // console.log(draggedShip)
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragEnter(e) {
    e.preventDefault()
  }

  function dragLeave() {
    // console.log('drag leave')
  }

  function dragDrop() {
    let shipNameWithLastId = draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0, -2)
    // console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)
    // console.log(shipLastId)
    const notAllowedHorizontal = [
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81,
      91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83,
      93,
    ]
    const notAllowedVertical = [
      99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,
      81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
      63, 62, 61, 60,
    ]

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(
      0,
      10 * lastShipIndex
    )
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

    shipLastId = shipLastId - selectedShipIndex
    // console.log(shipLastId)

    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === draggedShipLength - 1) directionClass = 'end'
        player1Grids[
          parseInt(this.dataset.id) - selectedShipIndex + i
        ].classList.add('taken', 'horizontal', directionClass, shipClass)
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === draggedShipLength - 1) directionClass = 'end'
        player1Grids[
          parseInt(this.dataset.id) - selectedShipIndex + width * i
        ].classList.add('taken', 'vertical', directionClass, shipClass)
      }
    } else return

    displayGrid.removeChild(draggedShip)
    if (!displayGrid.querySelector('.ship')) allShipsPlaced = true
  }

  function dragEnd() {
    // console.log('dragend')
  }

  // Game Logic for MultiPlayer
  function playGameMulti(socket) {
    setupButtons.style.display = 'none';
    if (isGameOver) 
      return;
    if(!player1Ready) {
      socket.emit('player-ready')
      player1Ready = true
      playerReady(playerNum);
    }

    if (player2Ready) {
      if (currentPlayer === 'current-player') {
        turnDisplay.innerHTML = 'Your Turn';
      } // end if 
      if (currentPlayer === 'player2') {
        turnDisplay.innerHTML =
          'Waiting for the other player to take their turn'
      }
    }
  }

  function playerReady(num) {
    let player = `.p${parseInt(num) + 1}`
    document.querySelector(`${player} .ready`).classList.toggle('active')
  }

  let destroyerCount = 0
  let submarineCount = 0
  let cruiserCount = 0
  let battleshipCount = 0
  let carrierCount = 0

  function revealSquare(classList) {
    const player2Square = player2Grid.querySelector(`div[data-id='${shotFired}']`)
    const obj = Object.values(classList)
    if (
      !player2Square.classList.contains('boom') &&
      currentPlayer === 'current-player' &&
      !isGameOver
    ) {
      if (obj.includes('destroyer')) destroyerCount++
      if (obj.includes('submarine')) submarineCount++
      if (obj.includes('cruiser')) cruiserCount++
      if (obj.includes('battleship')) battleshipCount++
      if (obj.includes('carrier')) carrierCount++
    }
    if (obj.includes('taken')) {
      player2Square.classList.add('boom')
    } else {
      player2Square.classList.add('miss')
    }
    checkScore()
    currentPlayer = 'player2'
  }

  let cpuDestroyerCount = 0
  let cpuSubmarineCount = 0
  let cpuCruiserCount = 0
  let cpuBattleshipCount = 0
  let cpuCarrierCount = 0

  function player2Turn(square) {
    if (!player1Grids[square].classList.contains('boom')) {
      const hit = player1Grids[square].classList.contains('taken')
      player1Grids[square].classList.add(hit ? 'boom' : 'miss')
      if (player1Grids[square].classList.contains('destroyer'))
        cpuDestroyerCount++
      if (player1Grids[square].classList.contains('submarine'))
        cpuSubmarineCount++
      if (player1Grids[square].classList.contains('cruiser')) cpuCruiserCount++
      if (player1Grids[square].classList.contains('battleship'))
        cpuBattleshipCount++
      if (player1Grids[square].classList.contains('carrier')) cpuCarrierCount++
      checkScore()
    }
    currentPlayer = 'current-player'
    turnDisplay.innerHTML = 'Your Turn'
  }

  function checkScore() {
    if (gameMode === 'multiPlayer') player2 = 'player2'
    if (destroyerCount === 2) {
      infoDisplay.innerHTML = `You sunk ${player2}'s destroyer`
      destroyerCount = 10
    }
    if (submarineCount === 3) {
      infoDisplay.innerHTML = `You sunk ${player2}'s submarine`
      submarineCount = 10
    }
    if (cruiserCount === 3) {
      infoDisplay.innerHTML = `You sunk ${player2}'s cruiser`
      cruiserCount = 10
    }
    if (battleshipCount === 4) {
      infoDisplay.innerHTML = `You sunk ${player2}'s battleship`
      battleshipCount = 10
    }
    if (carrierCount === 5) {
      infoDisplay.innerHTML = `You sunk ${player2}'s carrier`
      carrierCount = 10
    }
    if (cpuDestroyerCount === 2) {
      infoDisplay.innerHTML = `${player2} sunk your destroyer`
      cpuDestroyerCount = 10
    }
    if (cpuSubmarineCount === 3) {
      infoDisplay.innerHTML = `${player2} sunk your submarine`
      cpuSubmarineCount = 10
    }
    if (cpuCruiserCount === 3) {
      infoDisplay.innerHTML = `${player2} sunk your cruiser`
      cpuCruiserCount = 10
    }
    if (cpuBattleshipCount === 4) {
      infoDisplay.innerHTML = `${player2} sunk your battleship`
      cpuBattleshipCount = 10
    }
    if (cpuCarrierCount === 5) {
      infoDisplay.innerHTML = `${player2} sunk your carrier`
      cpuCarrierCount = 10
    }

    if (
      destroyerCount +
        submarineCount +
        cruiserCount +
        battleshipCount +
        carrierCount ===
      50
    ) {
      infoDisplay.innerHTML = 'YOU WIN'
      gameOver()
    }
    if (
      cpuDestroyerCount +
        cpuSubmarineCount +
        cpuCruiserCount +
        cpuBattleshipCount +
        cpuCarrierCount ===
      50
    ) {
      infoDisplay.innerHTML = `${player2.toUpperCase()} WINS`
      gameOver()
    }
  }

  function gameOver() {
    isGameOver = true
  }
})