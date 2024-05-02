import React from "react";
import Footer from "../constants/Footer";
import { Link } from "react-router-dom";
import RecipeImages from "../image/recipes.png";

function Home() {
  return (
    <div className="App">
      <div className="home">
        <header className="Header center">
          <h1>Ctrl-Alt-Defeat Recipes</h1>
        </header>
        <div className="about blueCard">
          <h3>
            <Link to="/search">Search</Link> | Cook |{" "}
            <Link to="/history">Save</Link> | Enjoy
          </h3>
          <p>
          Whether you're searching for a family-friendly meal, planning a special occasion dinner, or simply looking for culinary inspiration, 
          Ctrl-Alt-Defeat Recipe has you covered. So why wait? Start exploring, cooking, and sharing your culinary adventures with us today! 
          Explore the <Link to="/search">Search</Link>  page and find a recipe that will work for you! Check out the create page to build and save your own recipes! 
          Use the <Link to="/history">History</Link>  page to look back and cook your favorite recipes again and again!
          </p>
          <img
            src={RecipeImages}
            className="recipeImageSlide"
            alt="recipe images"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
