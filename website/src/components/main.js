import React from 'react';

const Main = () => {
  return (
    <div id="main">
      <div className="inner">
        <div className="thumbnails">
          <div className="box">
            <a href="/AsteroidTracker" className="image fit">
              <img
                src={require('../components/images/asteroid.jpg')}
                alt="Asteroid"
              />
            </a>
            <div className="inner">
              <h3>Near Earth Asteroid Tracker UI</h3>
              <p>
                Built with React and D3.js, this web app uses NASA's 
                NeoWS API to track the nearest asteroids to Earth and 
                visualizes the solar system with their coordinates with D3.js
              </p>
              <a
                href="/AsteroidTracker"
                className="button fit"
                data-poptrox="youtube,800x400">Demo
              </a>
            </div>
          </div>



          

          <div className="box">
            <a href="/SpotifyAudioUI" className="image fit">
              <img
                src={require('../components/images/audioVisual.jfif')}
                alt="Asteroid"
              />
            </a>
            <div className="inner">
              <h3>Spotify Audio Visualizer</h3>
              <p>
                Built using HTML, CSS, JavaScript, MongoDB. Visualize your
                favorite songs.
              </p>
              <a
                href="/SpotifyAudioUI"
                className="button fit"
                data-poptrox="youtube,800x400"
              >
                Demo
              </a>
            </div>
          </div>

          <div className="box">
            <a href="/snakeGame" className="image fit">
              <img
                src={require('../components/images/snake.jpg')}
                alt="Asteroid"
              />
            </a>
            <div className="inner">
              <h3>Snake Game</h3>
              <p>An interactive snake game built with Html, CSS, JavaScript.</p>
              <a
                href="/snakeGame"
                className="button fit"
                data-poptrox="youtube,800x400"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Main;