import React from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Main from './components/main'
import Resume from './components/Resume'
import AsteroidTracker from './components/AsteroidTracker'
import SnakeGame from './components/snakeGame';
import SpotifyAudioUI from './components/SpotifyAudioUI'
import { Routes, Route } from 'react-router-dom'
import '../src/App.css';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/resume" element={<Resume />} />

        <Route path="/AsteroidTracker" element={<AsteroidTracker />} />

        <Route path="/SpotifyAudioUI" element={<SpotifyAudioUI />} />

        <Route path="/Snakegame" element={<SnakeGame />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
