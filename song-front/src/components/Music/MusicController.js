import React, { useRef, useState, useEffect } from "react";
import { useMusicPlayer } from "../context/MusicPlayerContext";

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
  } = useMusicPlayer();

  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

      //TODO its skipping a track somewhy when clicking on next
      // Add the ended event listener to play the next track
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
            <input
              type="range"
              min="0"
              max={duration || 1}
              value={currentTime}
              onChange={handleSeek}
              className="mx-2"
              style={{ flex: 1 }}
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
