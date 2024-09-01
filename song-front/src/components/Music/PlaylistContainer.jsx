import React from "react";
import { useParams } from "react-router-dom";
import PlaylistPage from "../../pages/PlaylistPage";
const PlaylistContainer = () => {
  const { id } = useParams(); // Extract playlistId from URL

  return <PlaylistPage playlistId={id} />;
};

export default PlaylistContainer;
