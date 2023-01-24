import {React} from 'react';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from './components/footer';
import SearchBar from './components/SearchBar'
// import data from "./SearchData.json"
// import BlackBox from './components/BlackBox';
import Navbar from "./components/navbar";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <SearchBar placeholder="Search a song" />
      <h1>This is a test </h1>
      {/* <BlackBox /> */}
      <Footer />
    </div>
  )
}

export default App;