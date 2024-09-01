import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand className="ms-3">TuneWave</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/users">
          Users
        </Nav.Link>
        <Nav.Link as={Link} to="/home">
          Home Page
        </Nav.Link>
      </Nav>
      <Nav className="ms-auto">
        <LogoutButton />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
