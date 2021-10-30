import axios from "./axios";

const cartAPI = {
  addToCart: (cartItems) => {
    const url = "/cart/addToCart";
    return axios.post(url, cartItems);
  },
  getCartItems: () => {
    const url = "/cart/getCartItems";
    return axios.get(url);
  },
  removeCartItem: (cartItem) => {
    const url = "/cart/removeItem";
    return axios.post(url, cartItem);
  },
};

export default cartAPI;
