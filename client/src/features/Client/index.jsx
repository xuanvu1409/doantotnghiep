import React from "react";
import {Switch} from "react-router-dom";
import Login from "./Auth/Login/index";
import Register from "./Auth/Register/index";
import Main from "./Main/index";
import PrivateRoute from "../../components/Client/PrivateRoute";
import PublicRoute from "../../components/Client/PublicRoute";

const Index = () => {

    return (
        <>
            <Switch>
                <PublicRoute path={'/login'} component={Login} />
                <PublicRoute path={'/register'} component={Register} />
                <PrivateRoute path={'/'} component={Main} />
            </Switch>
        </>
    )
}

export default Index;
