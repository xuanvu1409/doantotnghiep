import React, {} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import SideBar from "../../../components/Client/Sidebar";
import Matched from "./Matched";
import History from "./History";
import Favourite from "./Favourite";
import Search from "./Search";
import Encounters from "./Encounters";
import Profile from "./Profile";
import Setting from "./Setting";
import Message from "./Message";

const Index = () => {

    return (
        <div className="wrapper">
            {/* ONLY DEV */}
            {/* JS Preview mode only */}

            {/*Sidebar main*/}
            <SideBar/>
            {/*Sidebar main*/}

            {/* END ONLY DEV */}
            {/* ========== HEADER ========== */}
            {/* ========== END HEADER ========== */}
            {/* ========== MAIN CONTENT ========== */}
            {/* Navbar Vertical */}
            {/* End Navbar Vertical */}

            <main id="content" role="main" className="main pointer-event">
                {/* Content */}
                    <Switch>
                        <Route path={'/search'} component={Search} />
                        <Route path={'/encounters'} component={Encounters} />
                        <Route path={'/matched'} component={Matched} />
                        <Route path={'/history'} component={History} />
                        <Route path={'/favourite'} component={Favourite} />
                        <Route path={'/profile/:profileId'} component={Profile} />
                        <Route path={'/settings'} component={Setting} />
                        <Route path={'/message'} component={Message} />
                        <Redirect exact={true} from={'/'} to={'/encounters'} />
                    </Switch>
            </main>
            {/* ========== END MAIN CONTENT ========== */}
            {/* ========== SECONDARY CONTENTS ========== */}
            {/* ========== END SECONDARY CONTENTS ========== */}
        </div>
    );
};

export default Index;
