import axios from "./axios";

const userAPI = {
    updateUserInfo: (info) => {
        const url = "/user/updateUserInfo";
        return axios.post(url, info);
    },
};
export default userAPI;
