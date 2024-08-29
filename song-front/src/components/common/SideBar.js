import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = ({ className }) => {
  return (
    <div className={className}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/browse" className="nav-link">
          Browse
        </Nav.Link>
        <Nav.Link as={Link} to="/radio" className="nav-link">
          Radio
        </Nav.Link>
        <Nav.Link as={Link} to="/library" className="nav-link">
          Your Library
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
