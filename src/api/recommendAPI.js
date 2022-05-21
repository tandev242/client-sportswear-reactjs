import axios from './axios';

const recommendAPI = {
    recommendRelateItem : (reqBody) => {
        const url = "/recom/getRecommendedProductsById";
        return axios.post(url,reqBody);
    },
    recommendByBehavior : () => {
        const url = "/recom/getRecommendedProductsByBehavior";
        return axios.post(url);
    }
}
export default recommendAPI;