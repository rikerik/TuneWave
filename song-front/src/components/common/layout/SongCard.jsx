import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import "../../../styles/SongCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { updateFavoriteStatus } from "../../../api/FavoriteApi";
import { getUserDetailsFromToken } from "../../../Utils/TokenUtil";

/**
 * SongCard component renders a card that displays song information and allows
 * users to play the song or favorite/unfavorite it.
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
  const { playTrack, currentTrackId } = useMusicPlayer(); // Access the current track ID and playTrack function from the music player context
  const [isFavoritedState, setIsFavoritedState] = useState(isFavorited); // State to track if the song is favorited

  const userId = getUserDetailsFromToken().userId; // Get the userId from the token

  // Toggle favorite status
  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent playing a track when clicking on the heart icon

    // Update the ui
    setIsFavoritedState((prev) => !prev);

    // API call to update favorite status in the backend
    try {
      await updateFavoriteStatus(id, !isFavoritedState, userId);
      console.log("Favorite status updated successfully");
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Revert the UI change if the API call fails
      setIsFavoritedState((prev) => !prev);
    }
  };

  /**
   * Handles the play action when the song card is clicked.
   * Passes the current track details to the playTrack function from the context.
   */
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

export default SongCard;
