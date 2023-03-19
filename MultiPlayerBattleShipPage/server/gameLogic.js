const { createMatrixBoard } = require('../public/battleshipGame')

// Handling game state logic here


class Player {
  constructor(id) {
    this.id = id;
    this.board = createMatrixBoard();
  }
}


class Game{
  constructor() {
    this.players = [];
    this.currentPlayer = 'null'
  }

  // Add a new player to the game state 
  addPlayer(player) {
    if(this.players.length < 2) {
      this.players.push(player);
      if(this.players.length === 1) {
        this.currentPlayer = player.id;
      }
      return true;
    }
      return false;
  }

}

// Export these classes so they can be public to client.js, server.js
module.exports = { Game, Player };