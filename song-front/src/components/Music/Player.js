import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import api from "../../api/api";

//Component to play audio tracks
const Player = ({ trackId, onNext, onPrevious }) => {
  //State variables
  const [isPlaying, setIsPlaying] = useState(false); // To manage the play/pause state
  const [duration, setDuration] = useState(0); // To track the total duration of the audio
  const [currentTime, setCurrentTime] = useState(0); // To track the current playback time
  const [src, setSrc] = useState(""); // To store the object URL for the audio file
  const audioRef = useRef(null); // Reference to the audio element
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    // Fetch and play the new track when trackId changes
    if (trackId) {
      // Fetch the audio file from the server
      api
        .get(`/music/tracks/${trackId}`, { responseType: "blob" })
        .then((response) => {
          // Create a URL for the fetched blob data
          const url = URL.createObjectURL(response.data);
          setSrc(url); // Set the URL to state
          const audio = audioRef.current;
          audio.src = url; // Set the source of the audio element
          audio.play().catch((error) => {
            console.error("Error playing the audio file", error);
            setIsPlaying(false);
          });
          setIsPlaying(true); // Update play state
        })
        .catch((error) => {
          console.error("Error fetching the media file", error);
          setIsPlaying(false);
        });

      // Clean up object URL when component unmounts or trackId changes
      return () => {
        if (src) {
          URL.revokeObjectURL(src);
        }
      };
    }
  }, [trackId]); //rerun effect when trackId changes

  // Toggle play/pause of the audio
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing the audio file", error);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying); // Toggle play state
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  // Seek to a new time in the audio based on range input
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <Container fluid className="bg-dark text-light py-2 fixed-bottom">
      <Row className="align-items-center">
        <Col xs="auto">
          <Button variant="secondary" onClick={onPrevious}>
            Previous
          </Button>
        </Col>
        <Col xs="auto" className="d-flex justify-content-center">
          <Button variant="secondary" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <InputGroup className="w-75">
            <FormControl
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
            />
            <InputGroup.Text className="text-center">
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}{" "}
              /{Math.floor(duration / 60)}:
              {Math.floor(duration % 60)
                .toString()
                .padStart(2, "0")}
            </InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={onNext}>
            Next
          </Button>
        </Col>
        <Col xs="auto">
          <InputGroup>
            <FormControl
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              style={{ width: "100px" }} // Adjust width as needed
            />
          </InputGroup>
        </Col>
      </Row>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </Container>
  );
};

export default Player;
