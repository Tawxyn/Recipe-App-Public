import React, { useState, useEffect } from 'react';
import Nav from "../constants/NavBar"
import Footer from "../constants/Footer"


function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Flask endpoint created 
    fetch('/test_find_collection')  
      .then(response => response.json())
      .then(data => setRecipes(data.recipes))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div className='historyWhole'>
      <Nav/>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.summary}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Ready in: {recipe.readyInMinutes} minutes</p>
            <a href={recipe.sourceUrl}>Source</a>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
}

export default RecipeList;
