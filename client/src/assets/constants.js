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
export const address_API_config = {
  provinces_API_URL:
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
  districts_API_URL: `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
  ward_API_URL: `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
  token: "32a47ba8-29a5-11ec-ac0c-327af017d353",
  shop_id: 2125275,
  shipping_fee_API_URL: `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
};
// export const BASE_API_URL = `http://localhost:4000/api`;
export const BASE_API_URL = `https://apiserver-fitnessapp.herokuapp.com/api`;

// const PUBLIC_URL = `http://localhost:4000`;
const PUBLIC_URL = `https://apiserver-fitnessapp.herokuapp.com`;
export const PROD_IMAGE_BASE_URL = `${PUBLIC_URL}/img/products/`;
export const USER_IMAGE_BASE_URL = `${PUBLIC_URL}/img/users/`;
export const BASE_IMAGE_BASE_URL = `${PUBLIC_URL}/img/base/`;

export const fetchImage = (name, callback) => {
  if (name.includes("http") || name.includes("https")) return name;
  return callback(name);
};

export const fetchProductImage = (name) => PUBLIC_URL + `/img/products/${name}`;
export const fetchUserImage = (name) => PUBLIC_URL + `/img/users/${name}`;
export const fetchPostImage = (name) => PUBLIC_URL + `/img/posts/${name}`;
export const fetchServiceImage = (name) => PUBLIC_URL + `/img/services/${name}`;

//PAGINATION
export const PAGE_SIZE = 6;

//PAYPAL
export const PAYPAL_CONFIG = {
  secret:
    "ECRwSfvV_zekWRwFbe975fHtsD7IPWR-9NSiuEFPI0Gl_StUQUGh6Rqb9Lyc_zDlgH4rQe174f03UPa9",
  clientID: `AZSA8xyQ8cQd0VUkehg2o08WdhfPA7Pe6TCTGwP3-VykHwG1dAClk7Kepuo9WPmjzhVtMbgqOD6jGg5n`,
};

// export const CLIENT_PUBLIC_URL = `http://localhost:3000`;
export const CLIENT_PUBLIC_URL = `https://hht-fitness-app.netlify.app/`;

export const YT_THUMBNAIL_BASE_URL = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
