import api from "./api";

// Function to update the favorite status of a track
export const updateFavoriteStatus = (songId, isFavorited, userId) => {
  return api.post(
    "/favorite/favorites",
    {
      songId: songId,
      isFavorited: isFavorited,
    },
    {
      params: { userId },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getFavoriteTracksByUserId = (userId) => {
  return api.get(`/favorite/favorites/${userId}`);
};

export const getSavedTracks = (userId) => {
  return api.get(`/favorite/favorites/saved/${userId}`);
};
