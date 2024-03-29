import axios from "axios";
// import router from "@/router/index";
import { useAuthStore } from "@/stores/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// @ts-ignore
export const request = async (config) => {
  try {
    const res = await service.request(config);

    return Promise.resolve({
      ...res.data,
      success: true,
    });
  } catch (error) {
    // @ts-ignore
    if (error.response.status === 401) {
      const auth = useAuthStore();
      auth.logout();
    }
    return Promise.reject(error);
  }
};
