import { BASE_API_URL } from "../assets/constants";
import axiosClient from "./axiosClient";
const prodApi = {
  getAllProducts: () => {
    return axiosClient.get(BASE_API_URL + "/products", {});
  },
  addProduct: (body) => {
    return axiosClient.post(BASE_API_URL + "/products", body);
  },
  editProduct: (id, body) => {
    return axiosClient.put(BASE_API_URL + `/products/${id}`, body);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(BASE_API_URL + `/products/${id}`);
  },

  searchProducts: (prodName) =>
    // axiosClient.get(BASE_API_URL + `/products/search?prodName=${prodName}`),
    axiosClient.get(BASE_API_URL + `/products/search`, {
      params: {
        prodName,
      },
    }),
};
export default prodApi;
