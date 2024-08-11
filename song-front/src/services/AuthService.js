import api from "../api/api";

export const register = () => (user) => api.post("/register", user);
export const login = () => (user) => api.post("/login", user);
