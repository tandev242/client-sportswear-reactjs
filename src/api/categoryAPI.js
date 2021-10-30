import axios from "./axios";

const categoryAPI = {
    getCategories: () => {
        const url = "/category/getCategories";
        return axios.get(url);
    }
};
export default categoryAPI;
