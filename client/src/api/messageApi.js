import axios from "../libs/axios";

export const getMessageThread = async () => {
    return await axios.get('/message/get-thread');
}

export const getMessages = async (formData) => {
    return await axios.post('/message/get-messages', formData);
}