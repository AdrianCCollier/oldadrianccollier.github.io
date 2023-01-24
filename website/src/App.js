import { React } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/navbar'
import Gallery from './components/gallery'
import Footer from './components/footer'
// import SearchBar from './components/SearchBar'
// // import data from "./SearchData.json"
// import BlackBox from './components/BlackBox'


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <SearchBar placeholder="Search a song" /> */}
      <h1>Hi Hello Hey </h1>
      <gallery />
      <Footer />
    </div>
  )
}

export default App
