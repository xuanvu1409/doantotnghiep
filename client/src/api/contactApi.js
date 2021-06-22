import axios from "../libs/axios";

export const getContactById = async () => {
    return await axios.get('/contact/get-contact/');
}