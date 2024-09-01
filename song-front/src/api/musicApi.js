import api from "./api";

export const getPlaylists = () => api.get("/music/playlists");

export const getTracks = () => api.get("/music/tracks");

export const getTracksByPlaylistId = (playlistId) =>
  api.get(`/music/playlists/${playlistId}/tracks`);

export const getTrackById = (id) =>
  api.get(`/music/tracks/${id}`, { responseType: "blob" });
