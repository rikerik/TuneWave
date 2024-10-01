import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { getTrackById, getTracks } from "../../api/musicApi";

// Create a Context for the Music Player
const MusicPlayerContext = createContext();

// Custom hook to use the MusicPlayerContext
export const useMusicPlayer = () => useContext(MusicPlayerContext);
// Provider component to wrap around parts of the app that need access to music player context
export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [trackList, setTrackList] = useState([]); // Store the track list
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Store the index of the current track
  const [shuffle, setShuffle] = useState(false);

  // Function to play a specific track
  const playTrack = async (track) => {
    // Check if the selected track is already playing
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(true);
      return;
    }

    try {
      // Stop any currently playing track
      setIsPlaying(false);
      // Fetch the track data by its ID
      const response = await getTrackById(track.id);
      // Create a URL for the audio data
      const audioUrl = URL.createObjectURL(response.data);

      // Find the index of the new track in the trackList
      const newIndex = trackList.findIndex((t) => t.id === track.id);

      // Update state with the new track, audio source, and index
      setCurrentTrack(track);
      setAudioSrc(audioUrl);
      setIsPlaying(true);
      setCurrentTrackIndex(newIndex); // Update the index
    } catch (error) {
      console.error("Error fetching the track:", error);
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (trackList.length > 0) {
      if (shuffle) {
        // Shuffle Mode: play a random track
        const randomIndex = Math.floor(Math.random() * trackList.length);
        setCurrentTrackIndex(randomIndex);
        playTrack(trackList[randomIndex]);
      } else {
        // Normal Mode: play the next track
        const nextIndex = (currentTrackIndex + 1) % trackList.length;
        setCurrentTrackIndex(nextIndex);
        playTrack(trackList[nextIndex]);
      }
    }
  };

  const previousTrack = () => {
    if (trackList.length > 0) {
      const prevIndex =
        (currentTrackIndex - 1 + trackList.length) % trackList.length;
      setCurrentTrackIndex(prevIndex);
      playTrack(trackList[prevIndex]);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  // Effect to fetch the list of tracks on component mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getTracks();
        setTrackList(response.data.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  // Memoize the value object to avoid unnecessary re renders of consumers
  const value = useMemo(
    () => ({
      currentTrack,
      currentTrackId: currentTrack ? currentTrack.id : null,
      isPlaying,
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack,
      audioSrc,
      shuffle,
      toggleShuffle,
    }),
    [
      currentTrack,
      isPlaying,
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack,
      audioSrc,
      shuffle,
    ]
  );

  return (
    // Provide the context value to child components
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
