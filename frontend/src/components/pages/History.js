import React, { useState, useEffect } from "react";
import Nav from "../constants/NavBar";
import Footer from "../constants/Footer";
import axios from "axios";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from Flask endpoint
    fetch("/test_find_collection")
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleDelete = (id) => {
    // Skip delete operation if ID is undefined
    if (!id) {
      console.error("Recipe ID is undefined");
      return;
    }

    // Send DELETE request to delete recipe with given id
    axios
      .delete(`/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        // Handle success
        // Remove the deleted recipe from the recipes state
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        // Handle error //.replace(/<[^>]+>/g, "")
      });
  };

  return (
    <div>
      <Nav />
      <div className="HistoryWhole">
        <h1>Recipe History</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              {/* Rest of the code */}
              <div className="historytitle">
                <h2>{recipe.title}</h2>
              </div>
              <div className="historyimage">
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <p>{recipe.summary}</p> 
              <p>Servings: {recipe.servings}</p>
              <p>Ready in: {recipe.readyInMinutes} minutes</p>
              <a href={recipe.sourceUrl}>Source</a>
              <button onClick={() => handleDelete(recipe._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default RecipeList;
