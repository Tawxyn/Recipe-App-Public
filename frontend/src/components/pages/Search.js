import React, { useState } from "react";
import Nav from "../constants/NavBar";
import Footer from "../constants/Footer";

function SearchRecipes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/search?query=${searchQuery}`);
      const data = await response.json();
      console.log("recieved data:", data);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="">
      <Nav />
      <header className="Header center">
        <h1>Search for Recipes</h1>
      </header>
      <div className="content">
        <div className="search">
          <input
            className="searchBar"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
          ></input>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <h3 className="recipe-title">{result.title}</h3>
                  {result.image && (
                    <img src={result.image} alt={result.title} />
                  )}
                  <a href={`/recipe/${result.id}`}>View</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default SearchRecipes;
