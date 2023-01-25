import React from 'react'

function SpotifyAudioUI() {
  return (
    <div id="main">
      <div className="inner">
        <div className="thumbnails">
          <div className="box">
            <a href="/snakeGame" className="image fit">
              <img
                src={require('../components/images/asteroid.jpg')}
                alt="Asteroid"
              />
            </a>
            <div className="inner">
              <h3>This is the Spotify Audio UI Page</h3>
              <p>
                Built using HTML, CSS, JavaScript, MongoDB. Visualize your
                favorite songs.
              </p>
              <a
                href="FIXME"
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
}

export default SpotifyAudioUI;
