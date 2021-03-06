import { BASE_API_URL } from "../assets/constants";
import axiosClient from "./axiosClient";
export const authApi = {
  userLogin: (userNameID, userPassword) => {
    return axiosClient.post(BASE_API_URL + "/auth/login", {
      userNameID,
      userPassword,
    });
  },
  userRegister: (newUser) => {
    return axiosClient.post(BASE_API_URL + "/auth/register", { ...newUser });
  },
  loadUser: () => {
    return axiosClient.get(BASE_API_URL + "/auth/verify");
  },
  getLoginData: () => {
    // return axiosClient.get("http://localhost:4000/api/auth/login/google");

    return axiosClient.get(BASE_API_URL + "/auth/login/data");
  },
};
