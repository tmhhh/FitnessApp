import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const prodApi = {
  getAllProducts: () => axiosClient.get(BASE_API_URL + "/products", {}),

  searchProducts: (prodName) =>
    axiosClient.get(BASE_API_URL + `/products/search?prodName=${prodName}`),
};
export default prodApi;
