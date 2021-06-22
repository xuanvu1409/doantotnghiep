import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterPending: state => {
            state.status = "pending";
            state.message = "";
            state.isLoading = true
        },
        filterSuccess: (state, {payload}) => {
            state.isLoading = false;
            state.message = payload.message;
            state.status = 'success'
        },
        filterFail: (state, {payload}) => {
            state.isLoading = false;
            state.status = 'error';
            state.message = payload.response.data.message;
        }
    }
})

const {actions, reducer} = filterSlice;

export const {filterPending, filterSuccess, filterFail} = actions;

export default reducer;