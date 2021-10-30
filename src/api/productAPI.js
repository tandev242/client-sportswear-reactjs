import axios from "./axios";

const productAPI = {
  getProducts: () => {
    const url = "/product/getProducts";
    return axios.post(url);
  },
  getProductsBySlug: (type, slug) => {
    const url = `/product/${type}/${slug}`;
    return axios.get(url);
  },
  getProductBySlug: (slug) => {
    const url = `/product/${slug}`;
    return axios.get(url);
  },
  getSizes: () => {
    const url = `/size/getAllSizes`;
    return axios.get(url);
  },
  getProductsBySearchText: (searchText) => {
    const url = `/product/searchByProductName`;
    return axios.post(url, searchText);
  },
};
export default productAPI;
