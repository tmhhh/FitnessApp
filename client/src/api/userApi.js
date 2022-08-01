import { BASE_API_URL } from "../assets/constants";
import axiosClient from "./axiosClient";

const userApi = {
  updateAvatar: (formData) => {
    return axiosClient.put(BASE_API_URL + "/user/avatar", formData);
  },
  updateProfile: (newProfile) => {
    return axiosClient.put(BASE_API_URL + "/user/profile", { ...newProfile });
  },
  updatePassword: (newPassword) => {
    return axiosClient.put(BASE_API_URL + "/user/profile/password", {
      newPassword,
    });
  },
  updateTrackingIno: (trackingInfo) => {
    console.log({ trackingInfo });
    trackingInfo = {
      ...trackingInfo,
      isFilled: true,
      userHeight: trackingInfo.height,
      userAge: trackingInfo.age,
      userGender: trackingInfo.gender,
      userWeight: trackingInfo.weight,
      userGoal: trackingInfo.goal,
      userActivityLevel: trackingInfo.activityLevel,
      userBodyFat: trackingInfo.bodyFat,
    };
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
  addFavoriteProduct: (id) => {
    return axiosClient.put(BASE_API_URL + "/user/favorite/add", {
      id,
    });
  },
  removeFavoriteProduct: (id) => {
    return axiosClient.put(BASE_API_URL + "/user/favorite/remove", {
      id,
    });
  },
  getTotalNumbCustomers: () => axiosClient.get(BASE_API_URL + "/user/total"),
  addToWorkoutSchedule: (
    exerciseID,
    createdDate = new Date().toLocaleDateString()
  ) => {
    return axiosClient.post(BASE_API_URL + `/user/workout-schedule`, {
      exerciseID,
      createdDate,
    });
  },
  removeFromWorkoutSchedule: (
    exerciseID,
    createdDate = new Date().toLocaleDateString()
  ) => {
    return axiosClient.delete(BASE_API_URL + `/user/workout-schedule`, {
      data: {
        exerciseID,
        createdDate,
      },
    });
  },
};
export default userApi;
