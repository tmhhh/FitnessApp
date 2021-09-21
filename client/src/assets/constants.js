export const NUTRI_API_CONFIG = (params) => {
  return {
    method: "GET",
    url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
    params: { ingr: params.toString() },
    headers: {
      "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
      "x-rapidapi-key": "2afa2a5cddmsh1498ac601dd5c89p13573fjsn6fcfc992d860",
    },
  };
};

export const BASE_API_URL = `http://localhost:4000/api`;

const PUBLIC_URL = `http://localhost:4000`;

export const fetchProductImage = (name) => PUBLIC_URL + `/img/products/${name}`;
export const fetchUserImage = (name) => PUBLIC_URL + `/img/users/${name}`;
export const fetchPostImage = (name) => PUBLIC_URL + `/img/posts/${name}`;
