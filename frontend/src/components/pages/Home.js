import React, { useState, useEffect } from 'react';

function Home() {

  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch('/recipe').then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <header className="Header center">
        <h1>CSC 130 Class Project</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {(typeof data.recipe === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.recipe.map((recipe, i) => (
          <p key={i}>{recipe}</p>
        ))
      )}


      

    </div>
  );
}

export default Home;
