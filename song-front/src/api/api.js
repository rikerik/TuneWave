import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", //Base url
  headers: {
    "Content-Type": "application/json", //Default content type
  },
});

// Add a request interceptor to include an authorization token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from local storage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
  }
  return config;
});

export default api;
