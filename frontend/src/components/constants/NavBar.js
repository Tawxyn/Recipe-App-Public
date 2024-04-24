import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <h2>Ctrl-Alt-Defeat</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/create-recipe">Create Recipe</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
