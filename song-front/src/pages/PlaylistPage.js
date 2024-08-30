import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../components/common/SongCard";

const PlaylistPage = () => {
  const { id } = useParams(); // Get playlist ID from the URL
  const [tracks, setTracks] = useState([]);

  return (
    <div className="container mt-4">
      <h3>Playlist Songs</h3>
      <div className="row">
        {tracks.map((track) => (
          <div className="col-md-3 mb-3" key={track.id}>
            <SongCard
              title={track.title}
              artist={track.artist}
              imageUrl={track.image}
              id={track.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
