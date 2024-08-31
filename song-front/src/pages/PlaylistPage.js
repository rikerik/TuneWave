import React, { useEffect, useState } from "react";
import { getTracksByPlaylistId } from "../api/musicApi";
import SongCard from "../components/common/SongCard";

const PlaylistPage = ({ playlistId }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getTracksByPlaylistId(playlistId);
        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks for playlist:", error);
      }
    };

    fetchTracks();
  }, [playlistId]);

  return (
    <div>
      <h5>Tracks</h5>
      <div className="row">
        {tracks.map((track) => (
          <div className="col-md-2 mb-3" key={track.id}>
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
