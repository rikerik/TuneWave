import React from "react";
import PropTypes from "prop-types";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "../../styles/SongCard.css";

/**
 * Renders a card component for a song.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the song.
 * @param {string} props.artist - The artist of the song.
 * @param {string} props.imageUrl - The url of the song's image.
 * @param {string} props.id - The id of the song.
 * @returns {JSX.Element} The rendered SongCard component.
 */
const SongCard = ({ title, artist, imageUrl, id }) => {
  // Access playTrack function and currentTrackId from MusicPlayerContext
  const { playTrack, currentTrackId } = useMusicPlayer();

  // Check if the current track ID matches this card's ID to highlight this track
  const isActive = id === currentTrackId;

  // Function to handle play action when the card is clicked
  const handlePlay = () => {
    playTrack({ id, title, artist });
  };

  return (
    <div
      className={`song-card ${isActive ? "active" : ""}`}
      onClick={handlePlay}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="song-card-image"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        //If no image
        <div className="song-card-placeholder">No Image</div>
      )}
      <div className="song-card-details">
        <h5 className="song-card-title">{title}</h5>
        <p className="song-card-artist">{artist}</p>
      </div>
      {isActive && (
        //If song is playing this part will be rendered to indicate the track is playing
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
