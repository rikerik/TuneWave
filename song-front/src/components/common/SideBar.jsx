import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/SideBar.css";

const Sidebar = ({ className }) => {
  return (
    <div className={className}>
      <Nav className="flex-column">
        <hr className="my-1 sidebar-divider" />

        {/* Navigation links */}
        <Nav.Link as={Link} to="/home" className="nav-link nav-link-orange">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/library" className="nav-link nav-link-orange">
          Library
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="nav-link nav-link-orange">
          User
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
