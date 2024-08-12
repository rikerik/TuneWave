import React from "react";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import { Route, Routes } from "react-router-dom";

// Component to handle routing for user related pages
const UserPage = () => (
  <div>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/:id" element={<UserDetail />} />
    </Routes>
  </div>
);

export default UserPage;
