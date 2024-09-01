import React, { useEffect, useState } from "react";
import { getTracksByPlaylistId } from "../api/musicApi";
import SongCard from "../components/common/SongCard";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/SideBar";

const PlaylistPage = ({ playlistId }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!playlistId) {
      console.error("Playlist ID is missing");
      return;
    }

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
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="row flex-grow-1">
        <Sidebar className="col-md-1 bg-dark text-light p-3" />

        <div className="col-md-10">
          <div className="mt-4">
            <div className="row"></div>
          </div>

          <div className="row">
            {tracks.map((track) => (
              <div className="col-md-2 mb-3" key={track.id}>
                <SongCard
                  title={track.title}
                  artist={track.artist}
                  imageUrl={track.base64Image}
                  id={track.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
