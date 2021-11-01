import { BASE_API_URL } from "../assets/constants";
import axiosClient from "./axiosClient";

const userApi = {
  updateAvatar: (formData) => {
    return axiosClient.put(BASE_API_URL + "/user/avatar", formData);
  },
  updateProfile: (newProfile) => {
    return axiosClient.put(BASE_API_URL + "/user/profile", { ...newProfile });
  },
  updateTrackingIno: (trackingInfo) => {
    return axiosClient.put(BASE_API_URL + "/user/profile/tracking-info", {
      trackingInfo,
    });
  },
  addTrackingFood: (food) => {
    return axiosClient.put(BASE_API_URL + "/user/profile/food", {
      food,
    });
  },
  removeTrackingFood: (id) => {
    return axiosClient.delete(BASE_API_URL + "/user/profile/food", {
      params: { id },
    });
  },
};
export default userApi;
