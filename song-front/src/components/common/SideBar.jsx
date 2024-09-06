import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/SideBar.css";

const Sidebar = ({ className }) => {
  return (
    <div className={className}>
      <Nav className="flex-column">
        <hr className="my-3 sidebar-divider" />

        {/* Navigation links */}
        <Nav.Link as={Link} to="/browse" className="nav-link nav-link-orange">
          Browse
        </Nav.Link>
        <Nav.Link as={Link} to="/library" className="nav-link nav-link-orange">
          Library
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
