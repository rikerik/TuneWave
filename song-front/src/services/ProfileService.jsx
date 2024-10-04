import api from "../api/api";

export const updateUserProfile = (userId, formData) =>
  api.put(`/profile/update/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
