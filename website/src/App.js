import React from 'react'
import './App.css'
import Navbar from './components/navbar'
import Main from './components/main'
import Footer from './components/footer'


function App() {
  return (
    <div className="App">
      {/* <Routes> */}
        <Navbar />
      <Main />
      <Footer />
  
      {/* </Routes> */}
      
    </div>
  )
}

export default App;
