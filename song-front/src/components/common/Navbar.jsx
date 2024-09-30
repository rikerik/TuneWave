import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import LogoutButton from "./Logout";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import "../../styles/NavBar.css";

const logoSrc = "/logo.png";

const NavBar = ({ searchQuery, onSearchChange, filterOption }) => {
  const location = useLocation(); // Get current location

  const isHomePage = location.pathname === "/home"; // Check if on homepage

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="navbar navbar-custom fixed-top"
    >
      {/* Navbar.Brand with logo and title */}
      <Navbar.Brand className="d-flex align-items-center ms-3">
        <img src={logoSrc} alt="Logo" className="circular-logo" />
        <span className="gradient-text">TuneWave</span>
      </Navbar.Brand>

      {/* Conditionally render search bar and dropdown only on the homepage */}
      {isHomePage && (
        <Nav className="mx-auto d-flex justify-content-center align-items-center">
          <div className="search-container mx-4">
            <Form className="d-flex">
              {/* Search Bar */}
              <FormControl
                type="text"
                className="me-2 search-bar"
                placeholder={`Ready to set the mood?`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Form>
          </div>
        </Nav>
      )}

      <Nav className="ms-auto">
        <LogoutButton className="btn-logout" />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
