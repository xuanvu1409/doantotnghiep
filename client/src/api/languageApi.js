import axios from "../libs/axios";

export const getLanguage = async () => {
    return await axios.get('/language/get-all');
}