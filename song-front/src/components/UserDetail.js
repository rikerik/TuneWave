import React, { useState, useEffect } from "react";
import { getUserById } from "../services/UserService";
import { useParams } from "react-router-dom";

// Component for displaying details of a specific user
const UserDetail = () => {
  const { id } = useParams(); // Get the user ID from the route parameters
  const [user, setUser] = useState(null); // State to store the user details

  // Fetch user details when the component mounts or ID changes
  useEffect(() => {
    fetchUser();
  });

  // Function to fetch user details from the API and update state
  const fetchUser = async () => {
    const response = await getUserById(id); // Call the service function with the user ID
    setUser(response.data); // Update state with the fetched user details
  };

  return (
    <div className="container mt-5">
      {user ? (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">User Detail</h2>
          </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="card-text">
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p className="card-text">
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p className="card-text">
              <strong>ID:</strong> {user.id}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;
