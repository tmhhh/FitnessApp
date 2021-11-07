import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const billApi = {
  getTotalNumbBills: () => {
    return axiosClient.post(BASE_API_URL + "/bill/total");
  },
  getRevenueByYear: (year = 2021) => {
    return axiosClient.get(BASE_API_URL + "/bill/revenue-by-year", {
      params: { year },
    });
  },
};

export default billApi;
