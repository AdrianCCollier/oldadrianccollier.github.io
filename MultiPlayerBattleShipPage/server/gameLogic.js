// Handling game state logic here

class Game{
  constructor() {
    // initialize game state variables, player boards, turn, etc.
    this.id = Date.now();
    this.players = [];
    this.state = 'waitingForPlayers'
  }

  // Add a new player to the game state 
  addPlayer(playerId) {
    this.players.push({ id: playerId });
  }

  // Method to remove a player from the game
  removePlayer(playerId) {
    // Remove the player from the game state
  }

  // Other game-related methods, later
}

// Export the Game class so that it can be accessed by the other files
module.exports = Game;