import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import { MusicPlayerProvider } from "./components/context/MusicPlayerContext";
import MusicController from "./components/Music/MusicController";

function App() {
  return (
    <MusicPlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <MusicController />
      </Router>
    </MusicPlayerProvider>
  );
}

export default App;
