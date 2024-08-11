import api from "../api/api";

export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post("/login", userData);

    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
