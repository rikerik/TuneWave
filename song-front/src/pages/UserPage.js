import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import NavBar from "../components/common/Navbar";

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />

      {/* Routes for User Pages */}
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
};

export default UserPage;
