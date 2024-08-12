import api from "../api/api";

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
