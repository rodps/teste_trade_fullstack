import axios from "axios";
import { env } from "../env";
import { cookies } from "./cookies";

const axiosClient = axios.create({
  baseURL: env.backendUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.getJWT()}`,
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
