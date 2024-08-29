import api from "./api";

export const getTracks = () => api.get("/music/tracks");

export const getTrackById = (id) =>
  api.get(`/music/tracks/${id}`, { responseType: "blob" });
