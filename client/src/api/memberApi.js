import axios from '../libs/axios';
import queryString from 'query-string';

export const signIn = async (formData) => {
    return await axios.post('/login', formData);
}

export const signUp = async (formData) => {
    return await axios.post('/register', formData);
}

export const checkLogin = async () => {
    return await axios.get('/check-login');
}

export const getMemberByProfileId = async (profileId) => {
    return await axios.get(`/profile/get-member/${profileId}`);
}

export const getMemberById = async () => {
    return await axios.get(`/profile/get/`);
}

export const updateWorkAndEducation = async (formData) => {
    return await axios.put('/profile/update-work-and-education', formData);
}

export const uploadAvatar = async (formData) => {
    return await axios.put('/profile/upload-avatar', formData);
}

export const updateLocation = async (formData) => {
    return await axios.put('/profile/update-location', formData);
}

export const updateInterests = async (formData) => {
    return await axios.put('/profile/update-interests', formData);
}

export const updateLanguage = async (formData) => {
    return await axios.put('/profile/update-language', formData);
}

export const uploadImage = async (formData) => {
    return await axios.post('/profile/upload-image', formData);
}

export const removeImageById = async (_id) => {
    return await axios.delete('/profile/remove-image/'+ _id);
}

export const setAvatarById = async (_id) => {
    return await axios.get('profile/set-avatar/' + _id);
}

export const changePass = async (formData) => {
    return await axios.put('/profile/change-pass/', formData);
}

export const updateBasicInfo = async (formData) => {
    return await axios.put('/profile/update-basic-info/', formData);
}

export const updateContact = async (formData) => {
    return await axios.put('/profile/update-contact/', formData);
}

export const changeStatusContact = async (_id, formData) => {
    return await axios.put('/profile/change-status-contact/' + _id, formData);
}

export const deleteMember = async (_id) => {
    return await axios.delete('/profile/delete/');
}

export const updatePersonalInfo = async (formData) => {
    return await axios.put('/profile/update-personal-info', formData);
}

export const getPersonalInfo = async () => {
    return await axios.get('/profile/get-personal-info/');
}

export const updateFilter = async (formData) => {
    return await axios.put('/profile/update-filter', formData);
}

export const search = async (pagination) => {
    let paramsString = queryString.stringify(pagination);
    return await axios.get(`/search?${paramsString}`);
}

export const encounter = async (formData) => {
    return await axios.post('/encounter', formData);
}

export const getSpotlight = async () => {
    return await axios.get('/get-spotlight');
}
