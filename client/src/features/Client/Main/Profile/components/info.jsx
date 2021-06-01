import React, {useEffect, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import {getJobTitle} from "../../../../../api/jobTitleApi";
import {Controller, useForm} from "react-hook-form";
import $ from "jquery";
import WorkAndEducationForm from "./workAndEducationForm";
import LocationForm from "./locationForm";
import InterestsForm from "./interestsForm";
import LanguageForm from "./languageForm";

const Info = () => {

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
                <div className="card mb-3 mb-lg-5">
                    {/* Header */}
                    <div className="card-header">
                        <h2 className="card-header-title h5">Thông tin cá nhân</h2>
                        <button className="btn btn-sm btn-white"><i className="tio-edit"></i></button>
                    </div>
                    {/* End Header */}
                    {/* Body */}
                    <div className="card-body">
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                            <li className="py-0">
                                <small className="card-subtitle">About</small>
                            </li>
                            <li>
                                <i className="tio-user-outlined nav-icon"/>
                                Mark Williams
                            </li>
                            <li>
                                <i className="tio-briefcase-outlined nav-icon"/>
                                No department title
                            </li>
                            <li>
                                <i className="tio-city nav-icon"/>
                                Pixeel Ltd.
                            </li>
                            <li className="pt-2 pb-0">
                                <small className="card-subtitle">Contacts</small>
                            </li>
                            <li>
                                <i className="tio-online nav-icon"/>
                                mark@example.com
                            </li>
                            <li>
                                <i className="tio-android-phone-vs nav-icon"/>
                                +1 (555) 752-01-10
                            </li>
                            <li className="pt-2 pb-0">
                                <small className="card-subtitle">Teams</small>
                            </li>
                            <li className="font-size-sm text-body">
                                <i className="tio-group-equal nav-icon"/>
                                You are not a member of any teams
                            </li>
                            <li className="font-size-sm text-body">
                                <i className="tio-briefcase-outlined nav-icon"/>
                                You are not working on any projects
                            </li>
                        </ul>
                    </div>
                    {/* End Body */}
                </div>
                {/* End Card */}
                {/* Card */}
                <div className="card card-lg mb-3 mb-lg-5">
                    {/* Body */}
                    <div className="card-body text-center">
                        <div className="w-50 mx-auto mb-4">
                            <img className="img-fluid" src="assets\svg\illustrations\unlock.svg"
                                 alt="Image Description"/>
                        </div>
                        <div className="mb-3">
                            <h3>2-step verification</h3>
                            <p>Protect your account now and enable 2-step verification in the settings.</p>
                        </div>
                        <a className="btn btn-primary" href="account-settings.html#twoStepVerificationSection">Enable
                            Now</a>
                    </div>
                    {/* End Body */}
                </div>
                {/* End Card */}
            </div>

            <div className="col-lg-8">
                <WorkAndEducationForm/>

                <LocationForm/>
                {/* Card */}
                <div className="card mb-3 mb-lg-5">
                    {/* Header */}
                    <div className="card-header">
                        <h2 className="card-header-title h5">Tôi ở đây để</h2>

                        <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle">
                            <i className="tio-edit"/>
                        </button>
                    </div>
                    {/* End Header */}
                    {/* Body */}
                    <div className="card-body">

                    </div>
                    {/* End Body */}
                </div>
                {/* End Card */}

                <InterestsForm/>

                {/* Card */}
                <div className="card mb-3 mb-lg-5">
                    {/* Header */}
                    <div className="card-header">
                        <h2 className="card-header-title h5">Ngoại hình</h2>
                        {/* Unfold */}
                        <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle">
                            <i className="tio-edit"/>
                        </button>
                        {/* End Unfold */}
                    </div>
                    {/* End Header */}
                    {/* Body */}
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label className="input-label"
                                       htmlFor="exampleFormControlTextarea1">Về tôi</label>
                                <textarea id="exampleFormControlTextarea1" className="form-control"
                                          placeholder="Textarea field" rows="4"/>
                            </div>
                            <div className="form-group">
                                <label className="input-label" htmlFor="exampleFormControlInput1">Text</label>
                                <input type="text" id="exampleFormControlInput1" className="form-control"
                                       placeholder="John Doe"/>
                            </div>
                            <div className="form-group">
                                <label className="input-label" htmlFor="exampleFormControlInput1">Text</label>
                                <input type="text" id="exampleFormControlInput1" className="form-control"
                                       placeholder="John Doe"/>
                            </div>
                        </form>
                    </div>
                    {/* End Body */}
                </div>
                {/* End Card */}
                <LanguageForm/>
            </div>
        </div>
    );
};

export default Info;