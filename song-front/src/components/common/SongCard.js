import React from "react";
import PropTypes from "prop-types";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "../../styles/SongCard.css";

const SongCard = ({ title, artist, imageUrl, id }) => {
  const { playTrack } = useMusicPlayer();

  const handlePlay = () => {
    playTrack({ id, title, artist });
  };

  return (
    <div className="song-card" onClick={handlePlay}>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="song-card-image" />
      ) : (
        <div className="song-card-placeholder">No Image</div>
      )}
      <div className="song-card-details">
        <h5 className="song-card-title">{title}</h5>
        <p className="song-card-artist">{artist}</p>
      </div>
    </div>
  );
};

SongCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageUrl: PropTypes.string, // Update propTypes to accept optional imageUrl
  id: PropTypes.number.isRequired,
};

export default SongCard;
