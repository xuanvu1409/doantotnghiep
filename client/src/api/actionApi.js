import axios from "../libs/axios";

export const likeMember = async (formData) => {
    return await axios.post('/action/like', formData);
}