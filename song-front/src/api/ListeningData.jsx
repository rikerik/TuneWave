import api from "./api";

/**
 * Sends listening data to the server.
 *
 * @param {Object} data - The listening data to be sent.
 * @returns {Promise<Object>} The response data from the server.
 * @throws Will throw an error if the request fails.
 */
export const sendListeningData = async (data) => {
  try {
    const response = await api.post("/listening/statistics", data);
    return response.data;
  } catch (error) {
    console.error("Error sending listening data:", error);
    throw error;
  }
};

/**
 * Fetches the weekly listening time for a specific user.
 *
 * @param {string} userId - The ID of the user whose listening time is to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the response data containing the weekly listening time.
 * @throws Will throw an error if the request fails.
 */
export const getWeeklyListeningTime = async (userId) => {
  try {
    const response = await api.get(
      `/listening/users/${userId}/listening-time/week`
    );
    console.log(userId);
    return response.data;
  } catch (error) {
    console.error("Error fetching listening time:", error);
    throw error;
  }
};

/**
 * Fetches the favorite artists for a given user.
 *
 * @param {string} userId - The ID of the user whose favorite artists are to be fetched.
 * @returns {Promise<Object>} A promise that resolves to the data containing the favorite artists.
 * @throws Will throw an error if the request fails.
 */
export const getFavoriteArtists = async (userId) => {
  try {
    const response = await api.get(
      `/listening/users/${userId}/favorite-artists`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    throw error;
  }
};
