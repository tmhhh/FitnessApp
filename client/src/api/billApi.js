import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const billApi = {
  getTotalNumbBills: () => {
    return axiosClient.get(BASE_API_URL + "/bill/totalNumb");
  },
  getRevenueByYear: (year = 2021) => {
    return axiosClient.get(BASE_API_URL + "/bill/revenue-by-year", {
      params: { year },
    });
  },
  getBillHistoryByCustomer: () => {
    return axiosClient.get(BASE_API_URL + "/bill/history");
  },
  getIncompleteBill: () => {
    return axiosClient.get(BASE_API_URL + "/bill/incomplete");
  },
  getBills: (limit = 1) => {
    return axiosClient.get(BASE_API_URL + "/bill", {
      params: { limit },
    });
  },
  updateBillStatus: (billID, status) => {
    return axiosClient.put(BASE_API_URL + "/bill/status", {
      billID,
      status,
    });
  },
  getBillsByStatus: (status) => {
    return axiosClient.get(BASE_API_URL + "/bill/by-status", {
      params: {
        status,
      },
    });
  },
};

export default billApi;
