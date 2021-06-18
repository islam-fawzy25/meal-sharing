import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import React from "react";
import "./Nav.css";

const NavBar = () => {
  return (
    <>
      <nav className="navBar">
        <Link to="/"> Home</Link>
        <Link to="/meals"> Meals</Link>
     
      </nav>
    </>
  );
};

export default NavBar;
