import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import "../../styles/NavBar.css";

// Logo path
const logoSrc = "/logo.png";

const NavBar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="navbar navbar-custom"
    >
      {/* Navbar.Brand with logo and title */}
      <Navbar.Brand className="d-flex align-items-center ms-3">
        <img src={logoSrc} alt="Logo" className="circular-logo" />
        <span className="gradient-text">TuneWave</span>{" "}
      </Navbar.Brand>

      {/* Nav links */}
      <Nav className="mr-auto">
        {/* <Nav.Link as={Link} to="/users">
          Users
        </Nav.Link> */}
        <Nav.Link as={Link} to="/home" className="nav-link-large ms-3">
          Home Page
        </Nav.Link>
        <Nav.Link as={Link} to="/visualizer" className="nav-link-large ms-3">
          Visualizer
        </Nav.Link>
      </Nav>

      <Nav className="ms-auto">
        <LogoutButton className="btn-logout" />{" "}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
