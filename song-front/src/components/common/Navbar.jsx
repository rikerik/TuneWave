import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import LogoutButton from "./Logout";
import { Link, useLocation } from "react-router-dom"; // Updated import
import { FaHome, FaBook, FaUser } from "react-icons/fa";
import "../../styles/NavBar.css";

const logoSrc = "/logo.png";

const NavBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const location = useLocation();

  const isHomePage = location.pathname === "/home"; // Check if on the homepage

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="navbar navbar-custom fixed-top"
    >
      <Navbar.Brand className="d-flex align-items-center ms-1">
        <img src={logoSrc} alt="Logo" className="circular-logo" />
        <span className="gradient-text">TuneWave</span>
      </Navbar.Brand>

      <Nav className="ms-auto">
        <Nav.Link
          as={Link}
          to="/home"
          className="nav-link nav-link-orange nav-link-large"
        >
          <FaHome className="react-icons" title="Home" />
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/library"
          className="nav-link nav-link-orange nav-link-large"
        >
          <FaBook className="react-icons" title="Library" />
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/profile"
          className="nav-link nav-link-orange nav-link-large"
        >
          <FaUser className="react-icons" title="Profile" />
        </Nav.Link>
      </Nav>

      <Nav className="mx-auto d-flex justify-content-center align-items-center">
        <div className="search-container mx-4">
          {/* Search Form */}
          <Form className="d-flex" onSubmit={onSearchSubmit}>
            <FormControl
              type="text"
              className={`me-2 search-bar ${!isHomePage ? "disabled" : ""}`}
              placeholder="Ready to set the mood?"
              value={searchQuery}
              onChange={
                isHomePage ? (e) => onSearchChange(e.target.value) : undefined
              } // Disable input on non-homepage
            />
            {!isHomePage && <div className="cordon-effect" />}{" "}
          </Form>
        </div>
      </Nav>

      <Nav className="ms-auto">
        <LogoutButton className="btn-logout" />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
