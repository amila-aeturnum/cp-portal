import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
