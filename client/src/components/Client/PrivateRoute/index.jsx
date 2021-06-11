import React, {useEffect} from 'react';
import {Redirect, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Index = ({component: Component, ...rest}) => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const location = useLocation();
    const {isAuth} = useSelector(state => state.member);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            redirectLogin()
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
