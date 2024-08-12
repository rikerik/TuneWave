import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/UserService";

// Component for displaying a list of users
const UserList = () => {
  const [users, setUsers] = useState([]); // State to store the list of users

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API and update state
  const fetchUsers = async () => {
    const response = await getAllUsers(); // Call the service function to get users
    setUsers(response.data); // Update state with the fetched users
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
