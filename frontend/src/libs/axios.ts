import axios from "axios";
import { env } from "../env";

const axiosClient = axios.create({
  baseURL: env.backendUrl,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
