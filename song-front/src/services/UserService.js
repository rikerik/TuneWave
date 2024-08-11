import api from "../api/api";

export const getAllUsers = () => api.get("/users");
export const getUserById = (id) => api.get("/users/${id}");
