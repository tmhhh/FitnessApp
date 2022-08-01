import { BASE_API_URL } from "../assets/constants";
import { ConvertQueryString } from "../utils/QueryString";
import axiosClient from "./axiosClient";

const prodApi = {
  getAllProducts: () => {
    return axiosClient.get(BASE_API_URL + "/products", {});
  },
  getProductById: (id) => {
    return axiosClient.get(BASE_API_URL + `/products/${id}`);
  },
  getProducts: (options) => {
    return axiosClient.get(
      BASE_API_URL + `/products?${ConvertQueryString(options)}`
    );
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
  totalNumbProds: () => axiosClient.get(BASE_API_URL + "/products/total"),
  addDiscount: (prodID, discountPercent, startDate) => {
    return axiosClient.put(BASE_API_URL + `/products/discount/add`, {
      prodID,
      discountPercent,
      startDate,
    });
  },
  resetDiscount: (prodID) => {
    return axiosClient.put(BASE_API_URL + `/products/discount/reset`, {
      prodID,
    });
  },
};
export default prodApi;
