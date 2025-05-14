import axios, { AxiosInstance } from "axios";
import { baseURL } from "@/app/api/index";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  console.log("Setting auth token:", token ? "Token exists" : "No token");
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log("Current headers:", apiClient.defaults.headers.common);
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export const attachAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      console.log("Request headers:", config.headers);
      return config;
    },
    (error) => Promise.reject(error)
  );
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(
        "401 error, retrying request with current token:",
        apiClient.defaults.headers.common["Authorization"]
      );
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
