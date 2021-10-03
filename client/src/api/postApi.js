import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const URL = "/post";
const reviewApi = {
  fetch: () => {
    return axiosClient.get(BASE_API_URL + URL);
  },
  fetchByAuthor: (authorId) => {
    return axiosClient.get(BASE_API_URL + URL + `?authorId=${authorId}`);
  },
  create: (body) => {
    return axiosClient.post(BASE_API_URL + URL, body);
  },
  edit: (id, body) => {
    console.log("do edit");
    console.log(body);
    return axiosClient.put(BASE_API_URL + URL + `/${id}`, body);
  },
  delete: (id) => {
    return axiosClient.delete(BASE_API_URL + URL + `/${id}`);
  },
  likeReview: (id) => {
    return axiosClient.post(BASE_API_URL + URL + `/like/${id}`);
  },
};
export default reviewApi;
