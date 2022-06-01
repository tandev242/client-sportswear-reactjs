import axios from "./axios";

const authAPI = {
  login: (user) => {
    const url = "/auth/signin";
    return axios.post(url, user);
  },
  register: (user) => {
    const url = "/auth/signup";
    return axios.post(url, user);
  },
  logout: () => {
    const url = "/auth/signout";
    return axios.post(url);
  },
  isUserLoggedIn: () => {
    const url = "/auth/isUserLoggedIn";
    return axios.post(url);
  },
  loginByGoogle: (token) => {
    return axios.post("/auth/signin/google", token);
  },
  sendOtpToEmail: (email) => {
    return axios.post("/auth/sendOtpToEmail", email);
  },
  updateForgetPassword: (payload) => {
    return axios.post("/auth/updateForgetPassword", payload);
  }
};
export default authAPI;
