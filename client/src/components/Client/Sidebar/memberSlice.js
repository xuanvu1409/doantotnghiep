import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getMemberById} from "../../../api/memberApi";

const initialState = {
    currentMember: {},
    isLoading: false,
    error: '',
    isAuth: false
}

export const getMember = createAsyncThunk('member/getMember',  async (id) => {
    const {data} = await getMemberById(id);
    return data;
})

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        logout: state => {
            state.isLoading = false;
            state.error = '';
            state.currentMember = {};
            state.isAuth = false
        },
        isLogin: (state, {payload}) => {
            state.isAuth = true;
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
