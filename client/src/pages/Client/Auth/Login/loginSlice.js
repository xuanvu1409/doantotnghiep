import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: ''
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
            state.status = '';
            state.message = '';
        },
        loginSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.message = payload.message;
        },
        loginFail: (state, {payload}) => {
            state.isLoading = false;
            state.status = payload.response.status;
            state.message = payload.response.data.message;
        }
    }
})

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail } = actions;

export default reducer;
