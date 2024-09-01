import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import { MusicPlayerProvider } from "./components/context/MusicPlayerContext";
import MusicController from "./components/Music/MusicController";
import PlaylistContainer from "./components/Music/PlaylistContainer";

// Component to conditionally render MusicController
const ConditionalMusicController = () => {
  const location = useLocation();
  const shouldShowMusicController = !(
    location.pathname === "/" || location.pathname === "/register"
  );

  return shouldShowMusicController ? <MusicController /> : null;
};

function App() {
  return (
    <MusicPlayerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/playlist/:id" element={<PlaylistContainer />} />
        </Routes>
        <ConditionalMusicController />
      </Router>
    </MusicPlayerProvider>
  );
}

export default App;