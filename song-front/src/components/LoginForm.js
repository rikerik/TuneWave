import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/AuthService";

// Component for handling the user login form
const LoginForm = () => {
  // State hooks for form fields and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Call the login service function with form data
      const response = await login({ username, password });

      if (response.status === 200) {
        // On successful login, save the token to session storage
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        navigate("/home"); // Redirect to the user list page upon successful login
      } else {
        // Handle non-successful status codes
        setError("Invalid username or password"); // Set error message
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login. Please try again."); // Set error message
    }
  };

  return (
    <div className="container mt-5 w-25">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
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
