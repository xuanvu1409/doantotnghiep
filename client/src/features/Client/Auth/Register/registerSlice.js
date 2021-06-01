import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: ''
}

const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        registerPending(state,) {
            state.isLoading = true;
        },
        registerSuccess(state, {payload}) {
            console.log(payload)
            state.isLoading = false;
            state.status = 'success';
            state.message = payload.message;
        },
        registerFail(state, {payload}) {
            console.log(payload)
            state.isLoading = false;
            state.status = 'error';
            state.message = payload.response.data.message;
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = registerSlice;
// Extract and export each action creator by name
export const { registerPending, registerSuccess, registerFail } = actions;
// Export the reducer, either as a default or named export
export default reducer;
