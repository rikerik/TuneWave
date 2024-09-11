import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import LogoutButton from "./Logout";
import "../../styles/NavBar.css"; // Assuming this is where you store your CSS

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
      <Nav className="mx-auto d-flex justify-content-center align-items-center">
        <div className="search-container">
          <Form className="d-flex">
            <FormControl
              type="text"
              className="me-2 search-bar"
              placeholder="Search for tracks"
            />
          </Form>
        </div>
      </Nav>

      <Nav className="ms-auto">
        <LogoutButton className="btn-logout" />{" "}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
