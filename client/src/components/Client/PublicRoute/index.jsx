import React, {useEffect, useState} from 'react';
import { Route } from "react-router-dom";
import localStorage from "redux-persist/es/storage";

const Index = ({ component: Component, ...rest }) => {
    // const [isLogin, setIsLogin] = useState(false);
    //
    // useEffect(() => {
    //     check();
    // }, [])
    //
    // const check = async () => {
    //     if (localStorage.getItem('token')) {
    //         setIsLogin(true)
    //     }
    // }

    return (
        <Route {...rest} render={(props) => {
            return (
                <Component {...props} />
            );
        }} />
    );
};

export default Index;
