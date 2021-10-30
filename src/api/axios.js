import axios from "axios";
// import store from "../app/store";

const api = "https://api-sportswear.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: api,
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (req) => {
    // const { auth } = store.getState();
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
