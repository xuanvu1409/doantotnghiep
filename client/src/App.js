import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Switch, useLocation} from "react-router-dom";
import Client from "./features/Client/index";
import Admin from "./features/Admin/index";
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Loading from "./components/Share/loading";
import {useDispatch, useSelector} from "react-redux";
import {loading} from "./appSlice";
import {ToastContainer} from "react-toastify";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loading(true))
        window.$('.js-hs-unfold-invoker').each(function (e) {
            var unfold = new window.HSUnfold(window.$(this)).init();
        });

        return (
            setTimeout(() => {
                dispatch(loading(false))
            }, 1000))
    }, [location])

    return (
        <>
            <Loading/>
            <div className="App">
                <Switch>
                    <Route path={'/admin'} component={Admin}/>
                    <Route path={'/'} component={Client}/>
                </Switch>
                <ToastContainer/>
            </div>
        </>
    )
}

export default App;
