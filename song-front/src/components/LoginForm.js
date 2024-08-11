import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ username, password });
      console.log("Login response:", response);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        console.log("Token saved:", localStorage.getItem("token"));
        console.log("Attempting to navigate to /users");
        navigate("/users");
      } else {
        console.error("Login failed", response.status);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
