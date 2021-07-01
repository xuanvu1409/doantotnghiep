import axios from "../libs/axios";
import queryString from 'query-string';

export const getMessageThread = async (formData) => {
    let paramsString = queryString.stringify(formData);
    return await axios.get(`/message/get-thread?${paramsString}`);
}

export const getMessages = async (formData) => {
    let paramsString = queryString.stringify(formData);
    return await axios.get(`/message/get-messages?${paramsString}`);
}

export const sendMessage = async (formData) => {
    return await axios.post('/message/send-message', formData);
}