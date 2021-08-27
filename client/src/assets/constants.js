export const NUTRI_API_HEADER = {
  "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
  "x-rapidapi-key": "2afa2a5cddmsh1498ac601dd5c89p13573fjsn6fcfc992d860",
};
export const NUTRI_API_URL =
  "https://edamam-food-and-grocery-database.p.rapidapi.com/parser";

export const NUTRI_API_CONFIG = (params) => {
  return {
    method: "GET",
    url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parserb",
    params: { ingr: params.toString() },
    headers: {
      "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
      "x-rapidapi-key": "2afa2a5cddmsh1498ac601dd5c89p13573fjsn6fcfc992d860",
    },
  };
};
