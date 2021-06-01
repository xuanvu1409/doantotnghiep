import axios from "../libs/axios";

export const getLanguage = async (req, res) => {
    return axios.get('/language/get-all');
}