import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/SideBar";
import PlaylistCard from "../components/common/PlaylistCard";
import SongCard from "../components/common/SongCard";
import { getTracks } from "../api/musicApi";

const HomePage = () => {
  //State to hold the list of tracks fetched from the backend
  const [tracks, setTracks] = useState([]);
  //Sample playlist
  const playlists = [
    {
      id: 1,
      title: "Top Hits",
      description: "The best tracks right now",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273674ee85ea544f17b5726c54b",
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relax with these tracks",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b27395ce36c00a2f3ed2f6436ebf",
    },
    {
      id: 3,
      title: "Workout",
      description: "Get pumped up",
      imageUrl:
        "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/07/Hands-Clapping-Chaulk-Kettlebell.jpg?quality=86&strip=all",
    },
    {
      id: 4,
      title: "Focus",
      description: "Stay focused with these beats",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2739903dde25dafb8ae0d0d7c34",
    },
  ];

  //Fetching tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        //Await response
        const response = await getTracks();
        //Update state with the fetched tracks
        setTracks(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []); //Empty dependency array, so this runs only when component mounts

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
                    id={playlist.id} // Pass the ID to PlaylistCard
                    title={playlist.title}
                    description={playlist.description}
                    imageUrl={playlist.imageUrl}
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
