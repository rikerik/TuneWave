import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import LogoutButton from "./Logout";
import "../../styles/NavBar.css";

const logoSrc = "/logo.png";

const NavBar = ({
  searchQuery,
  onSearchChange,
  filterOption,
  onFilterChange,
}) => {
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
        <span className="gradient-text">TuneWave</span>
      </Navbar.Brand>

      {/* Nav links */}
      <Nav className="mx-auto d-flex justify-content-center align-items-center">
        <div className="search-container">
          <Form className="d-flex">
            {/* Search Bar */}
            <FormControl
              type="text"
              className="me-2 search-bar"
              placeholder={`Search for ${filterOption}`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form>
        </div>
      </Nav>

      {/* Search Filter Dropdown */}
      <DropdownButton
        id="dropdown-basic-button"
        title={`Search by: ${filterOption}`}
        variant="secondary"
        className="me-2"
        onSelect={onFilterChange} // Handle filter option change
      >
        <Dropdown.Item eventKey="track">Track Name</Dropdown.Item>
        <Dropdown.Item eventKey="artist">Artist Name</Dropdown.Item>
        <Dropdown.Item eventKey="playlist">Playlist Name</Dropdown.Item>
      </DropdownButton>

      <Nav className="ms-auto">
        <LogoutButton className="btn-logout" />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
