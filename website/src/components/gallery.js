import React from 'react'
import '../gallery.css'

const Gallery = () => {
  return (
    <div className="gallery">
      <div className="box">
        <a href="/" className="image-fit">
          Project 1
          <img src="/" alt="" />
        </a>
        {/* title
        <h3>Spotify Audio Visualizer</h3>
        <p>
          This is text
        </p>
        <a href="/" className="button-fit" data-poptrox="youtube,800x400">
          Demo
        </a> */}
      </div>
      <div className="box">
        <a href="/" className="image-fit">
          Project 2
          <img src="/" alt="" />
        </a>
        {/* title
        <h3>Spotify Audio Visualizer</h3>
        <p>
          This is text
        </p>
        <a href="/" className="button-fit" data-poptrox="youtube,800x400">
          Demo
        </a> */}
      </div>
      <div className="box">
        <a href="/" className="image-fit">
          Project 3
          <img src="/" alt="" />
        </a>
        {/* title
        <h3>Spotify Audio Visualizer</h3>
        <p>
          This is text
        </p>
        <a href="/" className="button-fit" data-poptrox="youtube,800x400">
          Demo
        </a> */}
      </div>
    </div>
  )
}

export default Gallery
