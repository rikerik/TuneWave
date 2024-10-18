import api from "./api";

/**
 * Retrieves lyrics based on the provided id.
 *
 * @param {number} id - The id of the lyrics to retrieve.
 * @returns {Promise} - A promise that resolves to the retrieved lyrics.
 */
export const getLyrics = (id) => {
  return api.get("/lyrics/getLyrics", {
    params: {
      id: id,
    },
  });
};
