import axios from "./axios";

const deliveryInfoAPI = {
    getDeliveryInfo: () => {
        const url = "/deliveryInfo/get";
        return axios.get(url);
    },
    addDeliveryInfo: (info) => {
        const url = "/deliveryInfo/add";
        return axios.post(url, info);
    },
    deleteDeliveryInfo: (payload) => {
        const url = "/deliveryInfo/delete";
        return axios.post(url, payload);
    },
    setDefaultDeliveryInfo: (payload) => {
        const url = "/deliveryInfo/setDefaultDeliveryInfo";
        return axios.post(url, payload);
    }
};
export default deliveryInfoAPI;
