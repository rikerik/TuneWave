import api from "./api";

// Fetch all tracks
export const getTracks = () => api.get("/music/tracks");

// Fetch tracks by playlist ID
export const getTracksByPlaylistId = (playlistId) =>
  api.get(`/music/playlists/${playlistId}/tracks`);

// Fetch track by ID
export const getTrackById = (id) =>
  api.get(`/music/tracks/${id}`, { responseType: "blob" });
