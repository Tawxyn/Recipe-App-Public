import React, { useState } from 'react';
import Nav from "../constants/NavBar"

function Home() {

const [searchQuery, setSearchQuery] = useState('')
const [searchResults, setSearchResults] = useState([])

const handleSearch = async () => {
  try {
    const response = await fetch(`/search?query=${searchQuery}`);
    const data = await response.json();
    setSearchResults(data.results);
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

  return (
    <div className="App">
      <Nav/>
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

      <div className='recipe search'>
        <input type="text" value = {searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search query">          
          </input>      
        <button onClick={handleSearch}>Search</button>
        <div>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map( (result, index) => (
              <li key={index}>
                <h3 className="recipe-title">{result.title}</h3>
                {result.image && <img src={result.image} alt={result.title} />}
                <a href={'/recipe/${result.id}'}>View</a>
                </li>
            ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default Home;
