import React, {useEffect, useState} from 'react';
import {Route, useLocation} from "react-router-dom";
import {checkLogin} from "../../../api/memberApi";
import localStorage from "redux-persist/es/storage";

const Index = ({component: Component, ...rest}) => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        check();
    }, [location])

    const check = async () => {
        await checkLogin().then(res => {
            if (res.data)
                setIsLogin(true)
        }).catch(e => {
            setIsLogin(false)
            window.location.replace('/login')
        })
    }


    return (
        <Route {...rest} render={(props) => (
            isLogin && <Component {...props} />
        )}/>
    )
};

export default Index;
