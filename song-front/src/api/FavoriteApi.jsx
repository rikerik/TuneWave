import api from "./api";

/**
 * Updates the favorite status of a song for a specific user.
 *
 * @param {string} songId - The ID of the song to update.
 * @param {boolean} isFavorited - The new favorite status of the song.
 * @param {string} userId - The ID of the user updating the favorite status.
 * @returns {Promise} - A promise that resolves to the response of the API call.
 */
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

/**
 * Fetches the favorite tracks for a given user by their user ID.
 *
 * @param {string} userId - The ID of the user whose favorite tracks are to be fetched.
 * @returns {Promise} - A promise that resolves to the response of the API call.
 */
export const getFavoriteTracksByUserId = (userId) => {
  return api.get(`/favorite/favorites/${userId}`);
};

//For HomePage to show hearts
/**
 * Fetches the saved tracks for a given user.
 *
 * @param {string} userId - The ID of the user whose saved tracks are to be fetched.
 * @returns {Promise} - A promise that resolves to the response of the API call.
 */
export const getSavedTracks = (userId) => {
  return api.get(`/favorite/favorites/saved/${userId}`);
};
