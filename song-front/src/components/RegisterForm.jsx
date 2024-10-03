import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/AuthService";
import "../styles/Form.css";

// Component for handling the user registration form
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        username,
        password,
        firstName,
        lastName,
      });

      if (response.status === 200) {
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        window.location.href = "/home";
      } else {
        console.error("Registration failed", response.status);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2 className="mb-4 text-center">Register</h2>
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          Have an account? <Link to="/">Log in now</Link>.
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
