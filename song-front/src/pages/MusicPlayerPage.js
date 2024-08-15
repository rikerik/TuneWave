import React, { useEffect, useState } from "react";
import TrackList from "../components/Music/TrackList";
import Player from "../components/Music/Player";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api/api";
import LogoutButton from "../components/common/Logout";

const MusicPlayerPage = () => {
  // State variable to keep track of the currently selected track index
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  // State variable to keep track of the list of music tracks
  const [tracks, setTracks] = useState([]);

  // Effect hook to fetch the list of tracks when the component mounts
  useEffect(() => {
    api
      .get("/music/tracks")
      .then((response) => setTracks(response.data)) // Update state with fetched tracks
      .catch((error) => console.error(error)); // Log errors
  }, []); // Empty dependency array means this effect runs once on component mount

  // Function to handle the selection of a track from the list
  const handleSelectTrack = (trackId) => {
    // Find the index of the selected track based on its ID
    const trackIndex = tracks.findIndex((track) => track.id === trackId);
    setCurrentTrackIndex(trackIndex); // Update state with selected track index
  };

  // Function to handle advancing to the next track
  const handleNextTrack = () => {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1); // Update state to the index of the next track
    }
  };

  // Function to handle going back to the previous track
  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1); // Update state to the index of the previous track
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#" className="ms-3">
          TuneWave
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="/music">
            Music Player
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <LogoutButton />
        </Nav>
      </Navbar>

      {/* Main Content */}
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center my-4">TuneWave</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <TrackList onSelectTrack={handleSelectTrack} tracks={tracks} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Player
              trackId={
                currentTrackIndex !== null
                  ? tracks[currentTrackIndex]?.id
                  : null
              }
              onNext={handleNextTrack}
              onPrevious={handlePreviousTrack}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MusicPlayerPage;
