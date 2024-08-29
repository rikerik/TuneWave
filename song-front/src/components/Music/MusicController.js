import React, { useRef, useState, useEffect } from "react";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const MusicController = () => {
  //Reference to the audio element
  const audioRef = useRef(null);

  // Destructuring necessary values and functions from the music player context
  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    audioSrc,
    nextTrack,
    previousTrack,
  } = useMusicPlayer();

  //state to manage volume, current time nad length of audio
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  //Effect to handle audio source changes
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      //Set volume
      audio.volume = volume;

      // If the audio source has changed, update it and reload the audio
      if (audioSrc !== audio.src) {
        audio.src = audioSrc;
        audio.load();
        if (isPlaying) {
          audio
            .play()
            .catch((error) => console.error("Playback error:", error));
        }
      } else if (isPlaying) {
        // Continue playing if the source is the same and playback is active
        audio.play().catch((error) => console.error("Playback error:", error));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audioSrc, volume]); //playback state, audio source, and volume

  // Effect to update current time and duration of the audio
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      // Function to update current time
      const updateTime = () => setCurrentTime(audio.currentTime);
      // Function to update duration and current time when audio data is loaded
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      // Event listeners for time update and audio data loading
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadeddata", setAudioData);

      // Cleanup event listeners on component unmount or audioSrc change
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadeddata", setAudioData);
      };
    }
  }, [audioSrc]); //audio source

  // Handler for volume change
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  // Handler for seeking within the audio track
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="music-controller bg-dark text-light d-flex justify-content-between align-items-center p-3 fixed-bottom">
      {currentTrack && (
        <>
          <div className="track-info">
            <p className="mb-0">
              {currentTrack.title} - {currentTrack.artist}
            </p>
          </div>
          {/* Audio element for playback */}
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
            {/* Seek bar for the audio track */}
            <input
              type="range"
              min="0"
              max={duration || 1}
              value={currentTime}
              onChange={handleSeek}
              className="mx-2"
              style={{ flex: 1 }}
            />
            {/* Display current time and duration */}
            <div className="time-info mx-2">
              <span>{formatTime(currentTime)}</span> /{" "}
              <span>{formatTime(duration)}</span>
            </div>
            {/* Volume control */}
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
        </>
      )}
    </div>
  );
};

// Utility function to format time in mm:ss format
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default MusicController;
