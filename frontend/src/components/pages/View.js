import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function RecipeView() {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const { recipeId } = useParams(); // Extracts the recipeID from the URL

    useEffect(() => {
        // Flask endpoint created 
        fetch(`/recipe/${recipeId}`)
        .then(response => response.json())
        .then(data => { 
            console.log("recieved data:", data)
            setRecipeDetails(data) // Stores the entire recipe object
        })
        .catch(error => console.error('Error fetchinggggg recipes:', error));
    }, [recipeId]);


    return (
        <div>
            <h1>Recipe Information</h1>
            {recipeDetails ? (
                <div>
                    <h2>{recipeDetails.title}</h2>
                    <img src={recipeDetails.image} alt={recipeDetails.title} />
                    <p>{recipeDetails.summary.replace(/<[^>]+>/g, '')}</p> {/* Removing HTML tags */}
                    <h3>Ingredients</h3>
                    <ul>
                        {recipeDetails.extendedIngredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.original}
                            </li>
                        ))}
                    </ul>
                </div>

            ) : (
                <p>Loading recipe details...</p>
            )
            }
        </div>
    );
}

export default RecipeView;