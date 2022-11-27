import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import logo from "../../assets/images/mealLogo.png";
import ReorderIcon from "@mui/icons-material/Reorder";

const NavBar = () => {
  const [visible, setVisible] = useState(false)
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

      <div className="icon" onClick={() => { setVisible(!visible) }}>
        <div>
        <ReorderIcon />
        </div>
        <div>
        {visible && (
        <div className="nav-list-section" >
          <div >
            <Link to="/" className="nav-link"> Home</Link>
          </div>
          <div >
            <Link to="/meals" className="nav-link"> Meals</Link>
          </div>
          <div >
            <Link to="/about" className="nav-link"> About</Link>
          </div>
          <div >
            <Link to="/joinus" className="nav-link"> Join-us</Link>
          </div>
        </div>
      )}
        </div>

       
      </div>
    
    </div>
  );
};

export default NavBar;
