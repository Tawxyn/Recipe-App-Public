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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
