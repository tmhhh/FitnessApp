import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";

const cartApi = {
  addToCart: (prodID, addedQuantity) => {
    return axiosClient.put(`${BASE_API_URL}/cart/add`, {
      prodID,
      addedQuantity,
    });
  },
  removeFromCart: (prodID) => {
    return axiosClient.delete(`${BASE_API_URL}/cart/delete`, {
      params: { prodID },
    });
  },
  updateCart: (prodID, quantity) => {
    return axiosClient.put(`${BASE_API_URL}/cart/update`, {
      prodID,
      quantity,
    });
  },
  updateProductSelect: (prodID) => {
    return axiosClient.put(`${BASE_API_URL}/cart/update/select`, {
      prodID,
    });
  },
  getUserCart: () => {
    return axiosClient.get(`${BASE_API_URL}/cart`);
  },
};
export default cartApi;
