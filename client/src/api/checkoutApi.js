import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const checkOutApi = {
  billCheckout: (bill) => {
    return axiosClient.post(BASE_API_URL + "/checkout", bill);
  },
};

export default checkOutApi;
