import React, { useState, useEffect } from "react";
import Nav from "../constants/NavBar";
import Footer from "../constants/Footer";



function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Flask endpoint created
    fetch("/test_find_collection")
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div>
      <Nav />
      <div className="HistoryWhole">
        <h1>Recipe History</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <div className="historytitle">
                <h2>{recipe.title}</h2>
              </div>
              <div className="historyimage">
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <p>{recipe.summary.replace(/<[^>]+>/g, "")}</p>
              <p>Servings: {recipe.servings}</p>
              <p>Ready in: {recipe.readyInMinutes} minutes</p>
              <a href={recipe.sourceUrl}>Source</a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default RecipeList;
