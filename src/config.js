const BASE_URL = "https://dummyjson.com";

export const getUserById = (id) => `${BASE_URL}/users/${id}`;
export const getPostsBy = (paramsCfg = {}) => {
  const keys = Object.keys(paramsCfg);

  const URL = `${BASE_URL}/posts`;

  if (keys.length === 0) {
    return URL;
  }

  const params = keys.reduce(
    (acc, key, idx, arr) =>
      `${acc}${key}=${paramsCfg[key]}${idx !== arr.length - 1 ? "&" : ""}`,
    "?"
  );

  return `${URL}${params}`;
};
