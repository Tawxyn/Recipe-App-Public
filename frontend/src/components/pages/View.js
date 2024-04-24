import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../constants/Footer";

function RecipeView() {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { recipeId } = useParams(); // Extracts the recipeID from the URL


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
          <div className="recipeViewCard">
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
            <div className="description">
              <h3>Description</h3>
              <p>{recipeDetails.instructions.replace(/<[^>]+>/g, "")}</p>{" "}
               <button className="addRecipe" onClick={() => handleAddRecipe(recipeId)}>
                     Add
              </button> 
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
