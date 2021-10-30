import axios from "./axios";

const brandAPI = {
  getBrands: () => {
    const url = "/brand/getBrands";
    return axios.get(url);
  },
};
export default brandAPI;
