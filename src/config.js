const BASE_URL = "https://dummyjson.com";

export const getUserById = (id) => `${BASE_URL}/users/${id}`;
export const getPostsByUserId = (id) => `${BASE_URL}/posts/user/${id}`;
