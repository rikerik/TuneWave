import React from "react";
import PropTypes from "prop-types";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "../../styles/SongCard.css";

const SongCard = ({ title, artist, imageUrl, id }) => {
  const { playTrack, currentTrackId } = useMusicPlayer();

  // Check if the current track ID matches this card's ID
  const isActive = id === currentTrackId;

  const handlePlay = () => {
    playTrack({ id, title, artist });
  };

  return (
    <div
      className={`song-card ${isActive ? "active" : ""}`}
      onClick={handlePlay}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="song-card-image" />
      ) : (
        <div className="song-card-placeholder">No Image</div>
      )}
      <div className="song-card-details">
        <h5 className="song-card-title">{title}</h5>
        <p className="song-card-artist">{artist}</p>
      </div>
      {isActive && (
        <div className="song-card-playing-indicator">Now Playing</div>
      )}
    </div>
  );
};

// Define prop types for the component
SongCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default SongCard;
