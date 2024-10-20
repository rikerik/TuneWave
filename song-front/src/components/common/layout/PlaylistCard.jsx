import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/PlaylistCard.css";

/**
 * PlaylistCard component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   @param {string} props.id - The id of the playlist.
 *   @param {string} props.title - The title of the playlist.
 *   @param {string} props.description - The description of the playlist.
 *   @param {string} props.imageUrl - The URL of the playlist image.
 *
 * @returns {JSX.Element} The rendered PlaylistCard component.
 */
const PlaylistCard = ({ id, title, description, imageUrl }) => {
  //Hook for navigation
  const navigate = useNavigate();

  // Function to handle card click and navigate to the playlist page
  const handleClick = () => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div className="playlist-card" onClick={handleClick}>
      <div className="playlist-card-image-wrapper">
        <img src={imageUrl} alt={title} className="playlist-card-image" />
      </div>
      <div className="playlist-card-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
