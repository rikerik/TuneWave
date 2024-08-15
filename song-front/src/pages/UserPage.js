import React from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import LogoutButton from "../components/common/Logout";
import { Navbar, Nav } from "react-bootstrap";

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#" className="ms-3">
          TuneWave
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="/music">
            Music Player
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <LogoutButton />
        </Nav>
      </Navbar>

      {/* Routes for User Pages */}
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default UserPage;
