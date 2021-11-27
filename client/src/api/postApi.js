import axiosClient from "./axiosClient";
import { BASE_API_URL } from "../assets/constants";
const URL = "/post";
const postApi = {
  fetch: () => {
    return axiosClient.get(BASE_API_URL + URL);
  },
  fetchAvailable: () => {
    return axiosClient.get(BASE_API_URL + URL + `?status=${"accepted"}`);
  },
  fetchById: (id) => {
    return axiosClient.get(BASE_API_URL + URL + `/${id}`);
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
  like: (id) => {
    return axiosClient.put(BASE_API_URL + URL + `/like/${id}`);
  },
  unlike: (id) => {
    return axiosClient.delete(BASE_API_URL + URL + `/like/${id}`);
  },
  getPostComments: (postId) => {
    return axiosClient.get(BASE_API_URL + URL + `/comment/${postId}`);
  },
  comment: (postId, body) => {
    return axiosClient.post(BASE_API_URL + URL + `/comment/${postId}`, body);
  },
  reply: (commentId, body) => {
    return axiosClient.post(BASE_API_URL + URL + `/reply/${commentId}`, body);
  },
  getTotalNumbPosts: () => axiosClient.get(BASE_API_URL + URL + "/total"),
};
export default postApi;
