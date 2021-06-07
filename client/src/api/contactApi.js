import axios from "../libs/axios";

export const getContactById = async (memberId) => {
    return await axios.get('/contact/get-contact/' + memberId);
}