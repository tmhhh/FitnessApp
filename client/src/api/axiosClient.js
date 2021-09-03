import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("USER_TOKEN");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosClient;
