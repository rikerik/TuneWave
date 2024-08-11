import React from "react";
import UserList from "../components/UserList";
import { Route, Routes } from "react-router-dom";

const UserPage = () => (
  <div>
    <h1>Users</h1>
    <Routes>
      <Route path="/" element={<UserList />} />
    </Routes>
  </div>
);

export default UserPage;
