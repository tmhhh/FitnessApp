import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const cateApi = {
  getCategories: () => {
    return axiosClient.get(BASE_API_URL + "/admin/category");
  },
  addingCate: (newCate) => {
    return axiosClient.post(BASE_API_URL + "/admin/category/add", newCate);
  },
  deletingCate: (cateID) => {
    return axiosClient.delete(
      BASE_API_URL + `/admin/category/delete/${cateID}`
    );
  },
  updatingCate: (updatingCate) => {
    return axiosClient.put(BASE_API_URL + `/admin/category/update`, {
      updatingCate,
    });
  },
};

export default cateApi;
