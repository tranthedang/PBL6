import Api from ".";

export const getRankings = async () => {
  const response = await Api.get("/get_links");
  return response;
};

export const reloadDb = async (body) => {
  const response = await Api.post("/map_reduce", body);
  return response;
};

export const getUrlsOfLink = async (body) => {
  const response = await Api.post("/get_urls", body);
  return response;
};

export const getTopKeywords = async (body) => {
  const response = await Api.post("/get_words", body);
  return response;
};
