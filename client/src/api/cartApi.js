import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";

const cartApi = {
  addToCart: (prodID) => {
    return axiosClient.get(`${BASE_API_URL}/cart/add?prodID=${prodID}`);
  },
};
export default cartApi;
