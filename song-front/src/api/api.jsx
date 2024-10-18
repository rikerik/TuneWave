import axios from "axios";

/**
 * Axios instance for making API requests.
 *
 * @type {import("axios").AxiosInstance}
 */
// Create an instance of axios with custom configuration
const api = axios.create({
  baseURL: "http://localhost:8080", // Base URL for all requests
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

// Add a request interceptor to include an authorization token if it exists
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Dynamically get token before each request

    if (token) {
      // If a token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }

    // Return the updated config
    return config;
  },
  (error) => {
    // Handle any error that occurs before the request is sent
    return Promise.reject(error);
  }
);

export default api;
