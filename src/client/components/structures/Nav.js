import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
   
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Meal sharing</Navbar.Brand>
        <Nav >
          <Nav.Link>
            <Link to="/"> Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/meals"> Meals</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/about"> About</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/joinus"> Join-us</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
  );
};

export default NavBar;
