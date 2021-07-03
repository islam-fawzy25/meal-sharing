import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import React from "react";
 import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";


const NavBar = () => {
  return (
    // <>
    //   {/* <Nav variant="tabs" defaultActiveKey="/home">
    //     <Nav.Item>
    //       <Nav.Link>
    //         <Link to="/"> Home</Link>
    //       </Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="link-1">
    //         <Link to="/meals"> Meals</Link>
    //       </Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link>
    //         <Link to="/about"> About</Link>
    //       </Nav.Link>
    //     </Nav.Item>
    //   </Nav> */}
    // </>
    <div>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link ><Link to="/"> Home</Link></Nav.Link>
        <Nav.Link ><Link to="/meals"> Meals</Link></Nav.Link>
        <Nav.Link ><Link to="/about"> About</Link></Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
    
  
  
  </div>
  );
};

export default NavBar;
