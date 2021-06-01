import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const Index = ({component: Component, ...rest}) => {
    const {isAuth} = useSelector(state => state.member);

    return (
        <Route {...rest} render={(props) => (
            isAuth === true
                ? <Component {...props} />
                : <Redirect to='/login'/>
        )}/>
    )
};

export default Index;
