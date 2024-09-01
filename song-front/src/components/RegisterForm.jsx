import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/AuthService";

// Component for handling the user registration form
const RegisterForm = () => {
  // State hooks for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Call the registration service function with form data
      const response = await register({
        username,
        password,
        firstName,
        lastName,
      });
      console.log("Registration successful:", response);
      if (response.status === 200) {
        // On successful register, save the token to session storage
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        console.log("Token saved:", sessionStorage.getItem("token")); // Log the saved token
        console.log("Attempting to navigate to /users");
        navigate("/home"); // Redirect to the user list page upon successful login
      } else {
        console.error("Login failed", response.status);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container mt-5 w-25">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
