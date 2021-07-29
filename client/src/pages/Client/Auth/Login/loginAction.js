import {loginPending, loginSuccess, loginFail} from "./loginSlice";
import {isLogin} from "../../../../components/Client/Sidebar/memberSlice";
import {signIn} from "../../../../api/memberApi";

export const loginAction = (formData) => async (dispatch) => {
    dispatch(loginPending());
    try {
        await signIn(formData).then((res) => {
            dispatch(isLogin(res.data));
            return res.data;
        }).then(res => {
            dispatch(loginSuccess(res));
        }).then(res => {
            window.location.replace('/');
        });
    } catch (e) {
        dispatch(loginFail(e))
    }
}
