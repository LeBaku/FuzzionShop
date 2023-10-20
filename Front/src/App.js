import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';
import Home from './Pages/Home.js';
import Pokemon from './Pages/Pokemon.js';
import Yugioh from './Pages/Yugioh.js';
import Magic from './Pages/Magic.js';
import Onepiece from './Pages/Onepiece.js';
import Admin from './Pages/Admins.js';
import SearchResults from "./Pages/SearchResults.js";
import './css/App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/pokemon" element={<Pokemon />}/>
          <Route path="/yugioh" element={<Yugioh />}/>
          <Route path="/magic" element={<Magic />}/>
          <Route path="/onepiece" element={<Onepiece />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;