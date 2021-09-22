import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const URL = "/reviews";
const reviewApi = {
  getReviewById: (productId) => {
    return axiosClient.get(BASE_API_URL + URL, { params: { productId } });
  },
  addReview: (body) => {
    return axiosClient.post(BASE_API_URL + URL, body);
  },
  editReview: (id, body) => {
    return axiosClient.put(BASE_API_URL + URL + `/${id}`, body);
  },
  deleteReview: (id) => {
    return axiosClient.delete(BASE_API_URL + URL + `/${id}`);
  },
  likeReview: (id) => {
    return axiosClient.post(BASE_API_URL + URL + `/like/${id}`);
  },
};
export default reviewApi;
