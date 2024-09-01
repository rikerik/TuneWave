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

      // Update state with the new track and audio source
      setCurrentTrack(track);
      setAudioSrc(audioUrl);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error fetching the track:", error);
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (trackList.length > 0) {
      // Calculate the index of the next track
      const nextIndex = (currentTrackIndex + 1) % trackList.length;
      setCurrentTrackIndex(nextIndex);
      playTrack(trackList[nextIndex]);
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

  // Effect to fetch the list of tracks on component mount
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await getTracks();
        setTrackList(response.data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  // Memoize the value object to avoid unnecessary re-renders of consumers
  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack,
      audioSrc,
    }),
    [
      currentTrack,
      isPlaying,
      playTrack,
      pauseTrack,
      nextTrack,
      previousTrack,
      audioSrc,
    ]
  );

  return (
    // Provide the context value to child components
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
