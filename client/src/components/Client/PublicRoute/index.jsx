import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

const Index = ({ component: Component, ...rest }) => {
    const { isAuth } = useSelector(state => state.member);

    useEffect(() => {
        if (isAuth) {
            window.location.replace('/')
        }
    }, [isAuth])

    return (
        <Route {...rest} render={(props) => {
            return (
                !isAuth && <Component {...props} />
            );
        }} />
    );
};

export default Index;
