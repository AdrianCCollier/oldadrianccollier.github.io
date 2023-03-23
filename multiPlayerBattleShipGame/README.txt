Installation commands for dependencies:

    npm install express socket.io nodemon

Run scripts added to package.json to run server:

    npm run start -> node server.js
    npm run dev   -> nodemon server.js

How to play this game:

    1. After starting the server, visit localhost:3000
    2. Drag and drop your ships onto your game board.
    3. Press 'Start' icon
    4. Open another tab or window and repeat steps 1-3, it will be for Player 2 this time.
    5. When it is your turn, click on a grid from the other player's board to attack.
    6. Black tiles represent a miss, red tiles represent a hit.
    7. Whoever sinks all their opponent's ships first, wins the game.
