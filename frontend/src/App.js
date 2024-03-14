import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import RecipeList from "./components/pages/History";
import Nav from './components/constants/NavBar';

function App() {
  return (
      <Router>
          <Nav />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/history" element={<RecipeList />} />
          </Routes>
      </Router>
  );
}

export default App;
