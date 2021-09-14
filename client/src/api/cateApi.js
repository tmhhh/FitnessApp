import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const cateApi = {
  getCategories: () => {
    return axiosClient.get(BASE_API_URL + "/admin/category");
  },
  //   addProduct: (body) => {
  //     return axiosClient.post(BASE_API_URL + "/products", body);
  //   },
  //   editProduct: (id, body) => {
  //     return axiosClient.put(BASE_API_URL + `/products/${id}`, body);
  //   },
  //   deleteProduct: (id) => {
  //     return axiosClient.delete(BASE_API_URL + `/products/${id}`);
  //   },
};

export default cateApi;
