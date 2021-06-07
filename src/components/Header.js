import React from "react";
import { Link } from "react-router-dom";

function Header({ actual, setActual }) {
  return (
    <header>
      <Link 
        className={actual === "Home" ? "actual" : ""} 
        to="/" 
        onClick={() => setActual("Home")}>
          <span>Home</span>
      </Link>
      <Link 
        className={actual === "Workout" ? "actual" : ""} 
        to="/workout" onClick={() => setActual("Workout")}>
          <span>Workout</span>
      </Link>
      <Link 
        className={actual === "Settings" ? "actual" : ""} 
        to="/settings" onClick={() => setActual("Settings")}>
          <span>Settings</span>
      </Link>
    </header>
  );
}

export default Header;