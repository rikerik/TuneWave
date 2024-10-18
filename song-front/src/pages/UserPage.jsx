import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import NavBar from "../components/common/Navbar";

const UserPage = () => {
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
