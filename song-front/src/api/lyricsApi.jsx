import api from "./api";

/**
 * Retrieves lyrics based on the provided id.
 *
 * @param {number} id - The id of the lyrics to retrieve.
 * @returns {Promise} - A promise that resolves to the retrieved lyrics.
 */
export const getLyrics = (id) => {
  //Get request to the endpoint with the id as a query parameter
  return api.get("/lyrics/getLyrics", {
    params: {
      id: id, // Passing the id
    },
  });
};
