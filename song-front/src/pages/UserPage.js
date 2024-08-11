import React from "react";
import UserList from "../components/UserList";
import UserDetail from "../components/UserDetail";
import { Route, Routes } from "react-router-dom";

const UserPage = () => (
  <div>
    <h1>Users</h1>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/:id" element={<UserDetail />} />
    </Routes>
  </div>
);

export default UserPage;
