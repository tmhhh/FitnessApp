import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
export const authApi = {
  userLogin: (userNameID, userPassword) => {
    return axiosClient.post(BASE_API_URL + "/auth/login", {
      userNameID,
      userPassword,
    });
  },
  userRegister: () => {},
};
