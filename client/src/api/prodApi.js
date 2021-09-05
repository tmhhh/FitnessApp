import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const prodApi = {
  getAllProducts: () => {
    return axiosClient.get(BASE_API_URL + "/products");
  },
};
export default prodApi;
