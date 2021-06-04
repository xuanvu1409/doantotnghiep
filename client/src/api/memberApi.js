import axios from '../libs/axios';

export const signIn = async (formData) => {
    return await axios.post('/login', formData);
}

export const signUp = async (formData) => {
    return await axios.post('/register', formData);
}

export const getMemberByProfileId = async (profileId) => {
    return await axios.get(`/profile/${profileId}`);
}

export const getMemberById = async (_id) => {
    return await axios.get(`/profile/get/${_id}`);
}

export const updateWorkAndEducation = async (formData) => {
    return await axios.post('/profile/update-work-and-education', formData);
}

export const uploadAvatar = async (formData) => {
    return await axios.post('/profile/upload-avatar', formData);
}

export const updateLocation = async (formData) => {
    return await axios.post('/profile/update-location', formData);
}

export const updateInterests = async (formData) => {
    return await axios.post('/profile/update-interests', formData);
}

export const updateLanguage = async (formData) => {
    return await axios.post('/profile/update-language', formData);
}

export const uploadImage = async (formData) => {
    return await axios.post('/profile/upload-image', formData);
}

export const getGalleryById = async (_id) => {
    return await axios.get('/profile/get-gallery/' + _id);
}

export const removeImageById = async (_id) => {
    return await axios.delete('/profile/remove-image/' + _id);
}

export const setAvatarById = async (_id) => {
    return await axios.get('profile/set-avatar/' + _id);
}