import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import MusicPlayerPage from "./pages/MusicPlayerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/*" element={<UserPage />} />
        <Route path="/music" element={<MusicPlayerPage />} />{" "}
        {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
