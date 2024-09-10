import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";
import "../../styles/NavBar.css";

// Logo path
const logoSrc = "/logo.png";

const NavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  // Toggle search bar visibility when "Browse" is clicked
  const handleBrowseClick = () => {
    setShowSearch((prev) => !prev);
  };

  // Detect clicks outside of the search bar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

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
      <Nav className="mr-auto d-flex align-items-center">
        {/* Browse button */}
        <Nav.Link
          as={Link}
          to="/home"
          className="nav-link-large ms-3"
          onClick={handleBrowseClick}
        >
          Browse
        </Nav.Link>

        {/* Conditional rendering of the search bar with animation */}
        <div
          ref={searchRef}
          className={`search-container ms-3 ${showSearch ? "show" : "hide"}`}
        >
          {showSearch && (
            <Form className="d-flex">
              <FormControl type="text" className="me-2 search-bar" />
            </Form>
          )}
        </div>
      </Nav>

      <Nav className="ms-auto">
        <LogoutButton className="btn-logout" />{" "}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
