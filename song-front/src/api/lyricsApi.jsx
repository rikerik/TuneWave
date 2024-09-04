import api from "./api";

export const getLyrics = (id) => {
  return api.get("/lyrics/getLyrics", {
    params: {
      id: id,
    },
  });
};
