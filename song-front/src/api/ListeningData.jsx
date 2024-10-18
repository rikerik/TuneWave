import api from "./api";

// Function to send listening data
export const sendListeningData = async (data) => {
  try {
    const response = await api.post("/listening/statistics", data);
    return response.data;
  } catch (error) {
    console.error("Error sending listening data:", error);
    throw error;
  }
};

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
