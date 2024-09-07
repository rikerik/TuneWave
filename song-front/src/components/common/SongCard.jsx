import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "../../styles/SongCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { updateFavoriteStatus } from "../../api/FavoriteApi";
import { jwtDecode } from "jwt-decode";

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

  // State to manage if a track is favorited or not
  const [isFavorited, setIsFavorited] = useState(false);

  // Extract user ID from JWT token
  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Use a library like jwt-decode
      return decodedToken.UserId; // Ensure this matches the field in your token
    }
    return null;
  };

  // Get user ID
  const userId = getUserIdFromToken();

  // Toggle favorite status
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent playing a track when clicking on heart icon

    // Toggle the UI
    setIsFavorited((prev) => !prev);

    // Call the API to update status
    updateFavoriteStatus(id, !isFavorited, userId)
      .then((response) => {
        console.log("Favorite status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating favorite status:", error);
        // Revert the state if the API request fails
        setIsFavorited((prev) => !prev);
      });
  };

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
        <div className="song-card-placeholder">No Image</div>
      )}
      <div className="song-card-details">
        <h5 className="song-card-title">{title}</h5>
        <p className="song-card-artist">{artist}</p>
      </div>

      {/* Heart icon to toggle favorite */}
      <div
        className="song-card-favorite"
        onClick={toggleFavorite}
        style={{ cursor: "pointer" }}
      >
        {isFavorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
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
