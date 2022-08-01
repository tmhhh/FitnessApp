export const BASE_API_URL = `http://localhost:4000/api`;
const PUBLIC_URL = `http://localhost:4000`;

export const CLIENT_PUBLIC_URL = `http://localhost:3000`;

// export const CLIENT_PUBLIC_URL = `https://hht-fitness-app.netlify.app/`;
// export const BASE_API_URL = `https://apiserver-fitnessapp.herokuapp.com/api`;
// const PUBLIC_URL = `https://apiserver-fitnessapp.herokuapp.com`;

//DJANGO SERVER
export const PREDICT_BODY_FAT_API_URL = `http://127.0.0.1:8000/api/body-fat-predict/`;
// export const PREDICT_BODY_FAT_API_URL =
//   "https://test-deploy-dj.herokuapp.com/api/body-fat-predict/";

//
export const NUTRI_API_CONFIG = (params, searchType = null) => {
  return searchType === "dish"
    ? {
        method: "GET",
        url: "https://api.edamam.com/api/recipes/v2",
        params: {
          app_id: "4280966c",
          app_key: "7bcd5756d10749b883cdeb125535ba75",
          type: "public",
          q: params.foodName?.toString(),
          diet: params.diet,
          health: params.health,
          cuisineType: params.cuisineType,
          mealType: params.mealType,
          calories: params.calories,
          imageSize: "THUMBNAIL",
        },
      }
    : {
        method: "GET",
        url: "https://api.edamam.com/api/food-database/v2/parser",
        params: {
          app_id: "078589f8",
          app_key: "198df3fcdc85e53b7999f94b847d00fc",
          ingr: params.foodName?.toString(),
          health: params.health,
          category: params.category,
          calories: params.calories,
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

export const YT_THUMBNAIL_BASE_URL = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const googleLogo =
  "https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg";
export const fbLogo =
  "https://accounts.fullstack.edu.vn/assets/images/signin/facebook-18px.svg";
