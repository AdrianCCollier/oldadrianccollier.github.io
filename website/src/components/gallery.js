import React from 'react'
import '../gallery.css'

const Gallery = () => {
  return (
    
    <div className="gallery">
      <div className="thumbnails">
        <Box
          image="images/spotifyVisualizer/2.jfif"
          title="Spotify Audio Visualizer"
          description="Built using HTML, CSS, JavaScript, MongoDB. Visualize your favorite songs."
          link="web-api-auth-examples-master/authorization_code/public/index.html"
          buttonText="Demo"
        />
        <Box
          image="images/asteroidTracker/asteroidthumb.jpg"
          title="Near Earth Asteroid Tracker"
          description="Built using NASA's Near Earth Object Web service API along with the Canvas API to visualize the location of nearby asteroids."
          link="asteroidTracker.html"
          buttonText="Demo"
        />
        <Box
          image="images/snek.jpg"
          title="JavaScript Snake Game"
          description="Built with HTML, CSS, JavaScript. A Fully featured Retro Snakegame."
          link="snakegame.html"
          buttonText="Demo"
        />
      </div>
    </div>
  )
}

const Box = ({ image, title, description, link, buttonText }) => {
  return (
    <div className="box">
      <a href={link} className="image fit">
        <img src={image} alt="" />
      </a>
      <div className="inner">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} class="button fit" data-poptrox="youtube,800x400">
          {buttonText}
        </a>
      </div>
    </div>
  )
}

export default Gallery
