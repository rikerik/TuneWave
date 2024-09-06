import React, { useRef, useState, useEffect } from "react";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import { Modal, Button, Spinner } from "react-bootstrap";
import { FiMusic, FiShuffle } from "react-icons/fi";
import { getLyrics } from "../../api/lyricsApi";

const MusicController = () => {
  const audioRef = useRef(null);

  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    audioSrc,
    nextTrack,
    previousTrack,
    shuffle,
    toggleShuffle,
  } = useMusicPlayer();

  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;

      if (audioSrc !== audio.src) {
        audio.src = audioSrc;
        audio.load();
        if (isPlaying) {
          audio
            .play()
            .catch((error) => console.error("Playback error:", error));
        }
      } else if (isPlaying) {
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }

      const handleEnded = () => {
        nextTrack();
      };
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [isPlaying, audioSrc, volume, nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadeddata", setAudioData);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadeddata", setAudioData);
      };
    }
  }, [audioSrc]);

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleShowLyrics = async () => {
    setShowLyrics(true);
    setLoading(true);

    try {
      if (currentTrack?.id) {
        const response = await getLyrics(currentTrack.id);
        if (response.data) {
          setLyrics(response.data || "Lyrics not available.");
        } else {
          setLyrics("Lyrics not available.");
        }
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setLyrics("Lyrics not available.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseLyrics = () => setShowLyrics(false);

  return (
    <div className="music-controller bg-dark text-light d-flex justify-content-between align-items-center p-3 fixed-bottom">
      {currentTrack && (
        <>
          <div className="track-info">
            <p className="mb-0">
              {currentTrack.title} - {currentTrack.artist}
            </p>
          </div>
          <audio ref={audioRef} />
          <div className="controls d-flex align-items-center">
            <button onClick={previousTrack} className="btn btn-light mx-2">
              Prev
            </button>
            <button
              onClick={() => {
                isPlaying ? pauseTrack() : playTrack(currentTrack);
              }}
              className="btn btn-light mx-2"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={nextTrack} className="btn btn-light mx-2">
              Next
            </button>

            {/* Shuffle Button */}
            <FiShuffle
              className="mx-2"
              size={24}
              style={{ cursor: "pointer", color: shuffle ? "green" : "white" }}
              onClick={toggleShuffle}
            />

            <input
              type="range"
              min="0"
              max={duration || 1}
              value={currentTime}
              onChange={handleSeek}
              className="mx-2"
              style={{ flex: 1 }}
            />
            {/* Lyrics Icon */}
            <FiMusic
              className="mx-2"
              size={24}
              style={{ cursor: "pointer" }}
              onClick={handleShowLyrics}
            />
            <div className="time-info mx-2">
              <span>{formatTime(currentTime)}</span> /{" "}
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="mx-2"
              style={{ width: "100px" }}
            />
          </div>

          {/* Modal for Lyrics */}
          <Modal
            show={showLyrics}
            onHide={handleCloseLyrics}
            size="lg"
            className="custom-modal"
            centered
            scrollable
          >
            <Modal.Header closeButton>
              <Modal.Title>Lyrics</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-lyrics-body">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner>
                </div>
              ) : (
                <div className="lyrics-content">{lyrics}</div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseLyrics}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default MusicController;
