import React from 'react';
import ScrollspyNav from "react-scrollspy-nav";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import BasicInfoForm from "./components/basicInfoForm";
import ContactForm from "./components/contactForm";
import './setting.css';
import DeleteForm from "./components/deleteForm";
import {StickyContainer, Sticky} from 'react-sticky';
import ChangePassForm from "./components/changePassForm";

const Index = () => {
    const {currentMember} = useSelector(state => state.member);

    return (
        <StickyContainer>
            {/* Page Header */}
            <div className="page-header">
                <div className="row align-items-end">
                    <div className="col-sm mb-2 mb-sm-0">
                        {/*<nav aria-label="breadcrumb">*/}
                        {/*    <ol className="breadcrumb breadcrumb-no-gutter">*/}
                        {/*        <li className="breadcrumb-item"><a className="breadcrumb-link" href="javascript:;">Pages</a></li>*/}
                        {/*        <li className="breadcrumb-item"><a className="breadcrumb-link" href="javascript:;">Account</a></li>*/}
                        {/*        <li className="breadcrumb-item active" aria-current="page">Settings</li>*/}
                        {/*    </ol>*/}
                        {/*</nav>*/}
                        <h1 className="page-header-title">Cài đặt</h1>
                    </div>
                    <div className="col-sm-auto">
                        <Link className="btn btn-primary" to={"/profile/" + currentMember.profileId}>
                            <i className="tio-user mr-1"/> Hồ sơ
                        </Link>
                    </div>
                </div>
                {/* End Row */}
            </div>
            {/* End Page Header */}
            <div className="row">
                <div className="col-lg-3">
                    {/* Navbar */}
                    <div className="navbar-vertical navbar-expand-lg mb-3 mb-lg-5">
                        {/* Navbar Toggle */}
                        <button type="button" className="navbar-toggler btn btn-block btn-white mb-3"
                                aria-label="Toggle navigation" aria-expanded="false"
                                aria-controls="navbarVerticalNavMenu" data-toggle="collapse"
                                data-target="#navbarVerticalNavMenu">
                      <span className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">Nav menu</span>
                        <span className="navbar-toggle-default">
                          <i className="tio-menu-hamburger"/>
                        </span>
                        <span className="navbar-toggle-toggled">
                          <i className="tio-clear"/>
                        </span>
                      </span>
                        </button>
                        {/* End Navbar Toggle */}
                        <div id="navbarVerticalNavMenu" className="collapse navbar-collapse">
                            {/* Navbar Nav */}
                            <ScrollspyNav
                                scrollTargetIds={["basic", "emailSection", "passwordSection", "socialAccountsSection", "deleteAccountSection"]}
                                activeNavClass="active" offset={110}
                            >
                                <Sticky topOffset={100}>
                                    {({style}) =>
                                        (
                                            <span style={{...style, width: '200px'}}>
                                            <ul id="navbarSettings"
                                                className="navbar-nav navbar-nav-lg nav-tabs card card-navbar-nav">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#basic">
                                                        <i className="tio-user-outlined nav-icon"/> Thông tin cơ bản
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#emailSection">
                                                        <i className="tio-online nav-icon"/> Email
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#passwordSection">
                                                        <i className="tio-lock-outlined nav-icon"/> Password
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#socialAccountsSection">
                                                        <i className="tio-instagram nav-icon"/> Liên hệ
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#deleteAccountSection">
                                                        <i className="tio-delete-outlined nav-icon"/> Xóa tài khoản
                                                    </a>
                                                </li>
                                            </ul>
                                            </span>
                                        )
                                    }
                                </Sticky>
                            </ScrollspyNav>
                            {/* End Navbar Nav */}
                        </div>
                    </div>
                    {/* End Navbar */}
                </div>
                <div className="col-lg-9">
                    {/* Card */}
                    <div id="basic" className="card mb-3 mb-lg-5">
                        <BasicInfoForm/>
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="emailSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h3 className="card-title h4">Email</h3>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <p>Email hiện tại của bạn là <span className="font-weight-bold">{currentMember.email}</span>
                            </p>
                            {/* Form */}
                            <form>
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="newEmailLabel" className="col-sm-3 col-form-label input-label">Địa
                                        chỉ email mới</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" name="newEmail" id="newEmailLabel"
                                               placeholder="Enter new email address"
                                               aria-label="Enter new email address"/>
                                    </div>
                                </div>
                                {/* End Form Group */}
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="passwordSection" className="card mb-3 mb-lg-5">
                        <ChangePassForm/>
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="socialAccountsSection" className="card mb-3 mb-lg-5">
                        <ContactForm/>
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="deleteAccountSection" className="card mb-3 mb-lg-5">
                        <DeleteForm memberId={currentMember._id}/>
                    </div>
                    {/* End Card */}
                    {/* Sticky Block End Point */}
                    <div id="stickyBlockEndPoint"/>
                </div>
            </div>
            {/* End Row */}
        </StickyContainer>

    );
};

export default Index;
