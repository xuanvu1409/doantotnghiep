import axios from "../libs/axios";

export const getInterests = () => {
    return axios.get("/interests/get-all");
}