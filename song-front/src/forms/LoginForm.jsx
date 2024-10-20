import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/AuthService";
import "../styles/Form.css";

// Component for handling the user login form
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ username, password });

      if (response.status === 200) {
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        window.location.href = "/library";
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="form-container ">
      <div className="card shadow p-4 mt-5 ">
        <h2 className="mb-4 text-center">Login</h2>
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
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          New user? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
