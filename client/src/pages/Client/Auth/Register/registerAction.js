import { registerPending , registerSuccess, registerFail} from "./registerSlice";
import {signUp} from "../../../../api/memberApi";
import {isLogin} from "../../../../components/Client/Sidebar/memberSlice";

export const registerAction = (formData) => async (dispatch) => {
    dispatch(registerPending);
    try {
        await signUp(formData).then((res) => {
            dispatch(isLogin(res.data));
            return res.data;
        }).then(res => {
            dispatch(registerSuccess(res));
        }).then(res => {
            window.location.replace('/');
        });

    } catch (e) {
        dispatch(registerFail(e))
    }
}
