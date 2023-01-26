import React from 'react';
import '../snakegame.css';
const SnakeGame = () => {
  return (
    <div>
      <div className="game-container">
        {/* <div className="title">Snek</div> */}
        <canvas className="game" width="800" height="400"></canvas>
      </div>

      {/* <button className="restart-button">Play Again</button> */}
      {/* <script src="assets/js/snakegame.js"></script> */}
    </div>
  )
}

export default SnakeGame;

