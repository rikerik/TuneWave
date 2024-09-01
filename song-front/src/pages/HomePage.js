import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/SideBar";
import PlaylistCard from "../components/common/PlaylistCard";
import SongCard from "../components/common/SongCard";
import { getPlaylists, getTracks } from "../api/musicApi";

const HomePage = () => {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylistsAndTracks = async () => {
      try {
        // Fetch playlists
        const playlistResponse = await getPlaylists();
        setPlaylists(playlistResponse.data);

        // Fetch tracks
        const trackResponse = await getTracks();
        setTracks(trackResponse.data);
      } catch (error) {
        console.error("Error fetching playlists or tracks:", error);
      }
    };

    fetchPlaylistsAndTracks();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="row flex-grow-1">
        <Sidebar className="col-md-2 bg-dark text-light p-3" />

        <div className="col-md-10">
          <div className="mt-4">
            <h5 className="mb-3">Featured Playlists</h5>
            <div className="row">
              {playlists.map((playlist) => (
                <div className="col-md-3 mb-3" key={playlist.id}>
                  <PlaylistCard
                    id={playlist.id}
                    title={playlist.title}
                    description={playlist.description}
                    imageUrl={playlist.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h5 className="mb-3">Recently Played</h5>
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
