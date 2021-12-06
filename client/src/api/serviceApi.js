import { BASE_API_URL } from "../assets/constants";
import { ConvertQueryString } from "../utils/QueryString";
import axiosClient from "./axiosClient";

const serviceApi = {
  getAll: () => {
    return axiosClient.get(BASE_API_URL + "/services", {});
  },
  getServices: (options) => {
    return axiosClient.get(
      BASE_API_URL + `/services?${ConvertQueryString(options)}`
    );
  },
  add: (body) => {
    return axiosClient.post(BASE_API_URL + "/services", body);
  },
  edit: (id, body) => {
    return axiosClient.put(BASE_API_URL + `/services/${id}`, body);
  },
  delete: (id) => {
    return axiosClient.delete(BASE_API_URL + `/services/${id}`);
  },
  register: (body) => {
    return axiosClient.post(BASE_API_URL + "/services/register", body);
  },
  unregister: (id) => {
    return axiosClient.delete(BASE_API_URL + `/services/register/${id}`);
  },
};
export default serviceApi;
