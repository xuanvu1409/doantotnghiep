import React from 'react';
import {useDispatch} from "react-redux";
import {logout} from "../memberSlice";

const Logout = () => {
    const dispatch = useDispatch();

    const signOut = async () => {
        localStorage.removeItem('token');
        await dispatch(logout());
    }

    return (
        <>
            <div className="position-absolute btn-signout" onClick={signOut}>
                <i className="tio-sign-out"></i>
            </div>
        </>
    );
};

export default Logout;
