import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./Auth/Login/index";
import Register from "./Auth/Register/index";
import Main from "./Main/index";
import PrivateRoute from "../../components/Client/PrivateRoute";
import PublicRoute from "../../components/Client/PublicRoute";
import Message from "./Message";
import VideoCall from "./VideoCall";


const Index = () => {

    return (
        <>
            <Switch>
                {/*<PublicRoute path={'/login'} component={Login} />*/}
                {/*<PublicRoute path={'/register'} component={Register} />*/}
                <Route path={'/login'} component={Login} />
                <Route path={'/register'} component={Register} />
                <Route path={'/messages/:id'} component={Message} />
                <Route path={'/messages'} component={Message} />
                <Route path={'/videocall'} component={VideoCall} />
                <PrivateRoute path={'/'} component={Main} />
            </Switch>
        </>
    )
}

export default Index;
