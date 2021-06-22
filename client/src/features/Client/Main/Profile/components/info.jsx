import React, {useEffect, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import {getJobTitle} from "../../../../../api/jobTitleApi";
import {Controller, useForm} from "react-hook-form";
import $ from "jquery";
import WorkAndEducationForm from "./workAndEducationForm";
import LocationForm from "./locationForm";
import InterestsForm from "./interestsForm";
import LanguageForm from "./languageForm";
import {Link} from "react-router-dom";
import {current} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import Contact from "./contact";
import PersonalInfoForm from "./personalInfoForm";

const Info = ({member, isMe, load, contact}) => {

    return (
        <div className="row">
            <div className="col-lg-4">
                {/* Card */}
                {/*<div className="card card-body mb-3 mb-lg-5">*/}
                {/*    <h5>Complete your profile</h5>*/}
                {/*    /!* Progress *!/*/}
                {/*    <div className="d-flex justify-content-between align-items-center">*/}
                {/*        <div className="progress flex-grow-1">*/}
                {/*            <div className="progress-bar bg-primary" role="progressbar" style={{width: '15%'}}*/}
                {/*                 aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}/>*/}
                {/*        </div>*/}
                {/*        <span className="ml-4">15%</span>*/}
                {/*    </div>*/}
                {/*    /!* End Progress *!/*/}
                {/*</div>*/}
                {/* End Card */}
                {/* Card */}
                <Contact contact={contact} isMe={isMe}/>
                {/* End Card */}
            </div>

            <div className="col-lg-8">
                <WorkAndEducationForm member={member} isMe={isMe} load={load}/>

                <LocationForm member={member} isMe={isMe} load={load}/>

                <InterestsForm member={member} isMe={isMe} load={load}/>

                <PersonalInfoForm member={member} isMe={isMe} load={load}/>

                <LanguageForm member={member} isMe={isMe} load={load}/>
            </div>
        </div>
    );
};

export default Info;