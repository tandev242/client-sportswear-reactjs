import axios from "./axios";

const authAPI = {
  login: (user) => {
    const url = "/signin";
    return axios.post(url, user);
  },
  register: (user) => {
    const url = "/signup";
    return axios.post(url, user);
  },
  logout: () => {
    const url = "/signout";
    return axios.post(url);
  },
  isUserLoggedIn: () => {
    const url = "/isUserLoggedIn";
    return axios.post(url);
  },
  loginByGoogle: (token) => {
    return axios.post("/v1/auth/google", token);
  },
  sendOtpToEmail: (email) => {
    return axios.post("/sendOtpToEmail", email);
  },
  updateForgetPassword: (payload) => {
    return axios.post("/updateForgetPassword", payload);
  }
};
export default authAPI;
