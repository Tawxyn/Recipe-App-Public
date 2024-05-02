import React, { useState, useEffect } from "react";
import Footer from "../constants/Footer";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function SearchRecipes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterParam, setFilterParam] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const isFilterSelected = filterParam !== "";

  const handleSearch = async () => {
    try {
      const response = await fetch(`/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleFilter = async () => {
    try {
      // Keep results that meet filter criteria in searchResult state
      setFilteredResults(
        searchResults.filter((result) => result.dishTypes.includes(filterParam))
      );
    } catch (error) {
      console.error("Error filtering search:", error);
    }
  };

  const handleAddRecipe = async (recipeId) => {
    const formData = new FormData();
    formData.append("recipe_id", recipeId);

    try {
      await fetch("/add_recipe", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error adding recipe", error);
    }
  };

  // Calls handleFilter when filterParam changes
  useEffect(() => {
    console.log(filterParam);
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParam]);

  // TESTING
  useEffect(() => {
    console.log("filtered results:", filteredResults);
  }, [filteredResults]);

  return (
    <div className="searchWholePage">
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
            placeholder="Enter food"
          ></input>
          <button onClick={handleSearch}>Search</button>

          <select
            // Changes filterParam after clicking option
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Recipes by Dish Type"
          >
            <option value="">Filter by Dish Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch/Dinner</option>
            <option value="snack">Snack</option>
            <option value="soup">Soup</option>
            <option value="drink">Drink</option>
          </select>
        </div>
        <div className="results">
          {isFilterSelected ? (
            // If filter is selected, show regular filtered results
            filteredResults.length > 0 ? (
              <ul>
                {filteredResults.map((result, index) => (
                  <li key={index}>
                    <h3 className="recipe-title">{result.title}</h3>
                    {result.image && (
                      <img src={result.image} alt={result.title} />
                    )}
                    <div className="recipeOptionButtons">
                      <a href={`/recipe/${result.id}`}>View</a>
                      <Popup
                        trigger={<button> + </button>}
                        position="right center"
                      >
                        <div>Save the recipe?</div>
                        <button
                          className="addRecipeOnSearch"
                          onClick={() => handleAddRecipe(result.id)}
                        >
                          Add Now
                        </button>
                      </Popup>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-recipes-container">
                <p className="no-recipes-found">No recipes found!</p>
              </div> // Message if no filtered results
            )
          ) : // If no filter is selected, show ALL results
          searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>
                  <h3 className="recipe-title">{result.title}</h3>
                  {result.image && (
                    <img src={result.image} alt={result.title} />
                  )}
                  <div className="recipeOptionButtons">
                    <a href={`/recipe/${result.id}`}>View</a>
                    <Popup
                      trigger={<button> + </button>}
                      position="right center"
                    >
                      <div className="popup">
                        <div>Save the recipe?</div>
                        <button
                          className="addRecipeOnSearch"
                          onClick={() => handleAddRecipe(result.id)}
                        >
                          Add Now
                        </button>
                      </div>
                    </Popup>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-recipes-container">
              <p className="no-recipes-found">No recipes found!</p>
            </div> // Message if no results
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default SearchRecipes;
