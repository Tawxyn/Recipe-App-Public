import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../constants/Footer";

function RecipeView() {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { recipeId } = useParams(); // Extracts the recipeID from the URL

  useEffect(() => {
    // Flask endpoint created
    fetch(`/recipe/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("recieved data:", data);
        setRecipeDetails(data); // Stores the entire recipe object
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [recipeId]);

  return (
    <div>
      <div className="viewRecipe sidePage center">
        <h1>Recipe Information</h1>
        {recipeDetails ? (
          <div>
            <div className="recipeTitle">
              <h1>{recipeDetails.title}</h1>
              <div className="divider"></div>
            </div>
            <div className="imgWithIngredients">
              <img src={recipeDetails.image} alt={recipeDetails.title} />
              <div className="ingredients center">
                <h3>Ingredients</h3>
                <ul>
                  {recipeDetails.extendedIngredients.map(
                    (ingredient, index) => (
                      <li key={index}>{ingredient.original}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div>
              <h3>Instructions</h3>
              <p>{recipeDetails.summary.replace(/<[^>]+>/g, "")}</p>{" "}
            </div>
            {/* Removing HTML tags */}
          </div>
        ) : (
          <p>Loading recipe details...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RecipeView;
