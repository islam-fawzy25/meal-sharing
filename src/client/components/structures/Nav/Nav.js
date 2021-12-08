import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import logo from "../../../assets/images/hyf.png";

const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <div >
        <img className="logo" src={logo} />
      </div>
      <div className="nav-buttons-section">

        <div className="nav-button">
          <Link to="/" className="nav-link"> Home</Link>
        </div>
        <div className="nav-button">
          <Link to="/meals" className="nav-link"> Meals</Link>
        </div>
        <div className="nav-button">
          <Link to="/about" className="nav-link"> About</Link>
        </div>
        <div className="nav-button">
          <Link to="/joinus" className="nav-link"> Join-us</Link>
        </div>
      </div>

    </div>
  );
};

export default NavBar;
