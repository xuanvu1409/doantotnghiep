import React, {useEffect} from 'react';
import {Route, useLocation} from "react-router-dom";

const Index = ({component: Component, ...rest}) => {
    const location = useLocation();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) {
            console.log("hehye")
            redirectLogin()
        } else {
            console.log('hkhk')
        }
    }, [location])

    const redirectLogin = () => {
        window.location.replace('/login');
    }


    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem('token')
                && <Component {...props} />
        )}/>
    )
};

export default Index;
