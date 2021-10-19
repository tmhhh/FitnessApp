import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";

const userApi = {
  updateAvatar: (formData) => {
    return axiosClient.put(BASE_API_URL + "/user/avatar", formData);
  },
  updateProfile: (newProfile) => {
    return axiosClient.put(BASE_API_URL + "/user/profile", { ...newProfile });
  },
};
export default userApi;
