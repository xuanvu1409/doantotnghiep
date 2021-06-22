import axios from "../libs/axios";

export const likeMember = async (formData) => {
    return await axios.post('/action/like', formData);
}

export const favoriteMember = async (formData) => {
    return await axios.post('/action/favorite', formData);
}

export const sendCrush = async (formData) => {
    console.log(formData);
    return await axios.post('/action/send-crush', formData);
}