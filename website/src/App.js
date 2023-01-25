import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Footer from './components/footer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Hi </h1>
      <Gallery />
      <Footer />
    </div>
  )
}

export default App
