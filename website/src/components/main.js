import React from 'react'

const Main = () => {
  return (
    <div id="main">
      <div className="inner">
        <div className="thumbnails">
          <div className="box">
            <a href="/web-api-auth-examples-master/authorization_code/public/index.html" className="image fit">
              <img src="images/spotifyVisualizer/2.jfif" alt="" />
            </a>
            <div className="inner">
              <h3>Spotify Audio Visualizer</h3>
              <p>
                Built using HTML, CSS, JavaScript, MongoDB. Visualize your favorite songs.
              </p>
              <a href="/FIXME.html" className="button fit" data-poptrox="youtube,800x400">
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