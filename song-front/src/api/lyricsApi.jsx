import api from "./api";

export const getLyrics = (audioUrl) => {
  return api.get("/lyrics/get", {
    params: {
      audioUrl,
    },
  });
};
