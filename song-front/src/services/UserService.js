import api from "../api/api";

export const getAllUsers = async () => {
  return await api.get("/users", {
    headers: {
      Authorization: `Bearer ${"token"}`,
    },
  });
};
export const getUserById = (id) => api.get("/users/${id}");
