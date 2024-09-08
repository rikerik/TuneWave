import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/SideBar";
import PlaylistCard from "../components/common/PlaylistCard";
import SongCard from "../components/common/SongCard";
import { getPlaylists, getTracks } from "../api/musicApi";
import { getSavedTracks } from "../api/FavoriteApi";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [savedTrackIds, setSavedTrackIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistsAndTracks = async () => {
      try {
        // Fetch playlists
        const playlistResponse = await getPlaylists();
        setPlaylists(playlistResponse.data);

        // Fetch tracks
        const trackResponse = await getTracks();
        setTracks(trackResponse.data);

        // Fetch saved tracks
        const userId = getUserIdFromToken(); // Get user ID from token
        if (userId) {
          const savedTracksResponse = await getSavedTracks(userId);
          setSavedTrackIds(savedTracksResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistsAndTracks();
  }, []);

  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.UserId;
    }
    return null;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="row flex-grow-1">
        <Sidebar className="col-md-1 bg-dark text-light p-3" />

        <div className="col-md-11">
          <div className="mt-4">
            <h5 className="mb-3 text-center">Featured Playlists</h5>
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
            <hr className="border-dark"></hr>
          </div>
          <div className="mt-5 mb-5">
            <h5 className="mb-3 text-center">All tracks</h5>
            <div className="row">
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <div
                    className="spinner-border text-info p-lg-4"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                tracks.map((track) => (
                  <div className="col-md-2 col-lg-2 mb-5" key={track.id}>
                    <SongCard
                      title={track.title}
                      artist={track.artist}
                      imageUrl={track.base64Image}
                      id={track.id}
                      isFavorited={savedTrackIds.includes(track.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
