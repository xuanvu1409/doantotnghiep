import React, { useEffect } from 'react';
import { Route } from "react-router-dom";

const Index = ({ component: Component, ...rest }) => {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.replace('/')
        }
    }, [localStorage.getItem('token')])

    return (
        <Route {...rest} render={(props) => {
            return (
                !localStorage.getItem('token') && <Component {...props} />
            );
        }} />
    );
};

export default Index;
