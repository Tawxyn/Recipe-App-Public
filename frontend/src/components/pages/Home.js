import React, { useState } from 'react';
import Nav from "../constants/NavBar"
import Footer from "../constants/Footer"

function Home() {

  return (
    <div className="App">
      <Nav/>
      <header className="Header center">
        <h1>Ctrl-Alt-Defeat Recipes</h1>
       
      </header>

      <Footer/>
    </div>
  );
}

export default Home;
