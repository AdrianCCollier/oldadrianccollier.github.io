import React from 'react';
import {Link} from 'react-router-dom';
const Main = () => {
  return (
    <div id="main">
      <div className="inner">
        <div className="thumbnails">
          
          <div className="box">
          <Link to="../" className="image fit">
              <img src={require('../components/images/asteroid.jpg')} alt="Asteroid" />
            </Link>
            <div className="inner">
              <h3>Spotify Audio Visualizer</h3>
              <p>
                Built using HTML, CSS, JavaScript, MongoDB. Visualize your favorite songs.
              </p>
              <a href="FIXME" className="button fit" data-poptrox="youtube,800x400">
                Demo
              </a>
            </div>
          </div>

          <div className="box">
            <a href="/" className="image fit">
            <img src={require('../components/images/asteroid.jpg')} alt="Asteroid" />
            </a>
            <div className="inner">
              <h3>Spotify Audio Visualizer</h3>
              <p>
                Built using HTML, CSS, JavaScript, MongoDB. Visualize your favorite songs.
              </p>
              <a href="FIXME" className="button fit" data-poptrox="youtube,800x400">
                Demo
              </a>
            </div>
          </div>

          <div className="box">
            <a href="/" className="image fit">
            <img src={require('../components/images/asteroid.jpg')} alt="Asteroid" />
            </a>
            <div className="inner">
              <h3>Spotify Audio Visualizer</h3>
              <p>
                Built using HTML, CSS, JavaScript, MongoDB. Visualize your favorite songs.
              </p>
              <a href="FIXME" className="button fit" data-poptrox="youtube,800x400">
                Demo
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Main;