import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/AuthService";

// Component for handling the user login form
const LoginForm = () => {
  // State hooks for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Call the login service function with form data
      const response = await login({ username, password });
      console.log("Login response:", response); // Log the response from the login request

      if (response.status === 200) {
        // On successful login, save the token to local storage
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("Token saved:", localStorage.getItem("token")); // Log the saved token
        console.log("Attempting to navigate to /users");
        navigate("/users"); // Redirect to the user list page upon successful login
      } else {
        console.error("Login failed", response.status);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="container mt-5 w-25">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mb-3 mt-3">
        New user? <Link to="/register">Create an account</Link>
      </div>
    </div>
  );
};

export default LoginForm;
