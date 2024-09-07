import React, { useEffect, useState } from "react";
import { getFavoriteTracksByUserId } from "../api/FavoriteApi";
import SongCard from "../components/common/SongCard";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/SideBar";
import { jwtDecode } from "jwt-decode";

const LibraryPage = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract user ID from JWT token and set it in state
    const fetchUserId = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.UserId;
      }
      return null;
    };

    const userIdFromToken = fetchUserId();
    setUserId(userIdFromToken);

    if (userIdFromToken) {
      const fetchFavoriteTracks = async () => {
        try {
          const response = await getFavoriteTracksByUserId(userIdFromToken);
          setTracks(response.data);
        } catch (error) {
          console.error("Error fetching favorite tracks:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoriteTracks();
    } else {
      console.error("User ID is missing");
      setLoading(false);
    }
  }, []); // Dependency array is empty to run the effect only once on mount

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="row flex-grow-1">
        <Sidebar className="col-md-1 bg-dark text-light p-3" />
        <div className="col-md-10">
          <div className="mt-4">
            <h3>Your Favorite Tracks</h3>
          </div>
          <div className="row">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <div className="spinner-border text-info p-lg-4" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : tracks.length > 0 ? (
              tracks.map((track) => (
                <div className="col-md-2 col-lg-2 mb-5" key={track.id}>
                  <SongCard
                    title={track.title}
                    artist={track.artist}
                    imageUrl={track.base64Image}
                    id={track.id}
                  />
                </div>
              ))
            ) : (
              <div>No favorite tracks found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
