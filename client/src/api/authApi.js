import { BASE_API_URL } from "../assets/constants";
import axiosClient from "./axiosClient";
export const authApi = {
  userLogin: (userNameID, userPassword) => {
    return axiosClient.post(BASE_API_URL + "/auth/login", {
      userNameID,
      userPassword,
    });
  },
  userRegister: () => {},
  loadUser: () => {
    return axiosClient.get(BASE_API_URL + "/auth/verify");
  },
};
