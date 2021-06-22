import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: false,
    reducers: {
        loading: (state, {payload}) => {
           return payload;
        }
    }
})

const {actions, reducer} = appSlice;

export const {loading} = actions;

export default reducer;
