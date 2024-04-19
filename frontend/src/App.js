import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import RecipeList from "./components/pages/History";
import Nav from "./components/constants/NavBar";
import RecipeView from "./components/pages/View";
import SearchRecipes from "./components/pages/Search";
import CreateRecipe from "./components/pages/Create";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/history" element={<RecipeList />} />
        <Route path="/recipe/:recipeId" element={<RecipeView />} />
        <Route path="/search" element={<SearchRecipes />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
