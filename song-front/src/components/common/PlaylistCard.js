import React from "react";

const PlaylistCard = ({ title, description }) => {
  return (
    <div className="playlist-card bg-dark text-light p-3 mb-3">
      <h6>{title}</h6>
      <p>{description}</p>
    </div>
  );
};

export default PlaylistCard;
