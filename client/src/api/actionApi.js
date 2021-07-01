import axios from "../libs/axios";
import queryString from "query-string";

export const likeMember = async (formData) => {
    return await axios.post('/action/like', formData);
}

export const favoriteMember = async (formData) => {
    return await axios.post('/action/favorite', formData);
}

export const sendCrush = async (formData) => {
    return await axios.post('/action/send-crush', formData);
}

export const getAction = async (formData) => {
    const paramsString = queryString.stringify(formData);
    return await axios.get(`/action/get?${paramsString}`);
}

export const getMatched = async (formData) => {
    const paramsString = queryString.stringify(formData);
    return await axios.get(`/action/matched?${paramsString}`);
}

export const getMatchedRequest = async (formData) => {
    const paramsString = queryString.stringify(formData);
    return await axios.get(`/action/matched-request?${paramsString}`);
}

export const removeMatched = async (_id) => {
    return await axios.delete('/action/remove-matched/' +  _id);
}

export const confirmMatched = async (_id) => {
    return await axios.get('/action/confirm-matched/' +  _id);
}

export const getFavoritedYou = async (formData) => {
    const paramsString = queryString.stringify(formData);
    return await axios.get(`/action/favorite-you?${paramsString}`);
}

export const getYourFavories = async (formData) => {
    const paramsString = queryString.stringify(formData);
    return await axios.get(`/action/your-favorites?${paramsString}`);
}

export const removeFavorite = async (id) => {
    return await axios.delete('/action/remove-favorite/' +  id);
}