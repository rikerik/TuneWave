import api from "../api/api";

/**
 * Updates the user profile with the given form data.
 *
 * @param {string} userId - The ID of the user whose profile is being updated.
 * @param {FormData} formData - The form data containing the profile updates.
 * @returns {Promise} - A promise that resolves to the response of the API call.
 */
export const updateUserProfile = (userId, formData) =>
  api.put(`/profile/update/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
