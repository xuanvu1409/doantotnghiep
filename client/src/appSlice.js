import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        appPending: state => {
            state.isLoading = true;
        },
        appSuccess: state => {
            state.isLoading = false;
        },
        appFail: state => {
            state.isLoading = false
        }
    }
})

const {actions, reducer} = appSlice;

export const {appPending, appSuccess, appFail} = actions;

export default reducer;
