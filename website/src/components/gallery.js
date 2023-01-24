import React from 'react'
import '../gallery.css'

const Gallery = () => {
  return (
    <div className="thumbnails">
      <div className="box">
        <a href="/web-api-auth-examples-master/authorization_code/public/index.html" className="image fit">
          <img src="images/spotifyVisualizer/2.jfif" alt="" />
        </a>
        <div className="inner">
          <h3>Spotify Audio Visualizer</h3>
          <p>
            Built using HTML, CSS, JavaScript, MongoDB. Visualize your
            favorite songs.
          </p>
          <a
            href="/web-api-auth-examples-master/authorization_code/public/index.html"
            className="button fit"
            data-poptrox="youtube,800x400"
          >
            Demo
          </a>
        </div>
      </div>

      <div className="box">
        <a href="asteroidTracker.html" className="image fit">
          <img src="images/asteroidTracker/asteroidthumb.jpg" alt="" />
        </a>
        <div className="inner">
          <h3>Near Earth Asteroid Tracker</h3>
          <p>
            Built using NASA's Near Earth Object Web service API along with the
            Canvas API to visualize the location of nearby asteroids.
          </p>
          <a
            href="asteroidTracker.html"
            className="button style2 fit"
            data-poptrox="youtube,800x400"
          >
            Demo
          </a>
        </div>
      </div>

      <div className="box">
        <a href="snakegame.html" className="image fit">
          <img src="images/snek.jpg" alt="" />
        </a>
        <div className="inner">
          <h3>JavaScript Snake Game</h3>
          <p>
            Built with HTML, CSS, JavaScript. A Fully featured Retro Snakegame.
          </p>
          <a
            href="snakegame.html"
            className="button style3 fit"
            data-poptrox="youtube,800x400"
          >
            Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
