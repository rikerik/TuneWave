import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import "../../styles/SongCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { updateFavoriteStatus } from "../../api/FavoriteApi";
import { getUserIdFromToken } from "../../Utils/TokenUtil";

/**
 * Renders a card component for a song.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the song.
 * @param {string} props.artist - The artist of the song.
 * @param {string} props.imageUrl - The url of the song's image.
 * @param {string} props.id - The id of the song.
 * @param {boolean} props.isFavorited - Indicates if the song is favorited.
 * @returns {JSX.Element} The rendered SongCard component.
 */
const SongCard = ({ title, artist, imageUrl, id, isFavorited }) => {
  const { playTrack, currentTrackId } = useMusicPlayer();
  const [isFavoritedState, setIsFavoritedState] = useState(isFavorited);

  const userId = getUserIdFromToken();

  // Toggle favorite status
  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent playing a track when clicking on the heart icon

    // Update the ui
    setIsFavoritedState((prev) => !prev);

    // Call the API to update status
    try {
      await updateFavoriteStatus(id, !isFavoritedState, userId);
      console.log("Favorite status updated successfully");
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Revert the UI change if the API call fails
      setIsFavoritedState((prev) => !prev);
    }
  };

  // Function to handle play action when the card is clicked
  const handlePlay = () => {
    playTrack({ id, title, artist });
  };

  return (
    <div
      className={`song-card ${id === currentTrackId ? "active" : ""}`}
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
        {isFavoritedState ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      </div>

      {id === currentTrackId && (
        <div className="song-card-playing-indicator">Now Playing</div>
      )}
    </div>
  );
};

// Prop types for the component
SongCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  id: PropTypes.number.isRequired,
  isFavorited: PropTypes.bool,
};

export default SongCard;
