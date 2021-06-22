import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getMemberById} from "../../../api/memberApi";

const initialState = {
    currentMember: {},
    isLoading: false,
    error: '',
}

export const getMember = createAsyncThunk('member/getMember',  async () => {
    const {data} = await getMemberById();
    return data;
})

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        logout: state => {
            state.isLoading = false;
            state.error = '';
            // state.currentMember = {};
            localStorage.removeItem('token');
            window.location.replace('/login');
        },
        isLogin: (state, {payload}) => {
            state.currentMember = payload.member;
            localStorage.setItem('token', payload.token);
        }
    },
    extraReducers: {
        [getMember.pending] : (state) => {
            state.isLoading = true;
        },
        [getMember.fulfilled] : (state, {payload}) => {
            state.currentMember = payload;
            state.isLoading = false;
            state.error = '';
        },
        [getMember.rejected] : (state, {payload}) => {
            state.error = payload.message;
        },
    }
})

const { actions, reducer: memberReducer } = memberSlice;
export const {logout, isLogin} = actions;
export default memberReducer;
