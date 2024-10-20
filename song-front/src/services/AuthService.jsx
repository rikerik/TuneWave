import api from "../api/api";

/**
 * Registers a new user by sending a POST request to the /register endpoint.
 *
 * @param {Object} userData - The data of the user to register.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.email - The email of the user.
 * @returns {Promise<Object>} The response from the server.
 * @throws Will throw an error if the registration fails.
 */
export const register = async (userData) => {
  try {
    // Send a POST request to the /register endpoint with userData
    const response = await api.post("/register", userData);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Logs in a user by sending a POST request to the /login endpoint with the provided user data.
 *
 * @param {Object} userData - The user data to be sent in the login request.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response from the login request.
 * @throws Will throw an error if the login request fails.
 */
export const login = async (userData) => {
  try {
    // Send a POST request to the /login endpoint with userData
    const response = await api.post("/login", userData);
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
