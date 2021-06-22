import React, {useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import "./sidebar.css";
import {useSelector} from "react-redux";
import {titleCase} from "../../../utils/helper";
import Logout from "./components/logout";
import {Dropdown} from "react-bootstrap";
import {Slider} from "primereact/slider";
import Select from "../../Share/select";
import {getLocation} from "../../../api/locationApi";
import ButtonSubmit from "../../Share/buttonSubmit";
import {useForm} from "react-hook-form";
import Filter from "./components/Filter/filter";

const Index = () => {
    const memberState = useSelector(state => state.member);


    return (
        <>
            <div id="notificationDropdown"
                 className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu"
                 style={{width: '25rem'}}>
                {/* Header */}
                <div className="card-header">
                    <span className="card-title h4">Notifications</span>
                    {/* Unfold */}
                    <div className="hs-unfold">
                        <a className="js-hs-unfold-invoker btn btn-icon btn-sm btn-ghost-secondary rounded-circle"
                           href="javascript:;" data-hs-unfold-options="{
                 &quot;target&quot;: &quot;#notificationSettingsOneDropdown&quot;,
                 &quot;type&quot;: &quot;css-animation&quot;
               }">
                            <i className="tio-more-vertical"/>
                        </a>
                        <div id="notificationSettingsOneDropdown"
                             className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right">
                            <span className="dropdown-header">Settings</span>
                            <a className="dropdown-item" href="#">
                                <i className="tio-archive dropdown-item-icon"/> Archive all
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="tio-all-done dropdown-item-icon"/> Mark all as
                                read
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="tio-toggle-off dropdown-item-icon"/> Disable
                                notifications
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="tio-gift dropdown-item-icon"/> What's new?
                            </a>
                            <div className="dropdown-divider"/>
                            <span className="dropdown-header">Feedback</span>
                            <a className="dropdown-item" href="#">
                                <i className="tio-chat-outlined dropdown-item-icon"/> Report
                            </a>
                        </div>
                    </div>
                    {/* End Unfold */}
                </div>
                {/* End Header */}
                {/* Nav */}
                <ul className="nav nav-tabs nav-justified" id="notificationTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="notificationNavOne-tab"
                           data-toggle="tab" href="#notificationNavOne" role="tab"
                           aria-controls="notificationNavOne" aria-selected="true">Messages
                            (3)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="notificationNavTwo-tab" data-toggle="tab"
                           href="#notificationNavTwo" role="tab"
                           aria-controls="notificationNavTwo" aria-selected="false">Archived</a>
                    </li>
                </ul>
                {/* End Nav */}
                {/* Body */}
                <div className="card-body-height">
                    {/* Tab Content */}
                    <div className="tab-content" id="notificationTabContent">
                        <div className="tab-pane fade show active" id="notificationNavOne"
                             role="tabpanel" aria-labelledby="notificationNavOne-tab">
                            <ul className="list-group list-group-flush navbar-card-list-group">
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck1"
                                                           defaultChecked/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck1"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div className="avatar avatar-sm avatar-circle">
                                                    <img className="avatar-img"
                                                         src="assets\img\160x160\img3.jpg"
                                                         alt="Image Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Brian Warner</span>
                                            <p className="card-text font-size-sm">changed an
                                                issue from "In Progress" to <span
                                                    className="badge badge-success">Review</span>
                                            </p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">2hr</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck2"
                                                           defaultChecked/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck2"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div
                                                    className="avatar avatar-sm avatar-soft-dark avatar-circle">
                                                    <span className="avatar-initials">K</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Klara Hampton</span>
                                            <p className="card-text font-size-sm">mentioned you
                                                in a comment</p>
                                            <blockquote className="blockquote blockquote-sm">
                                                Nice work, love! You really nailed it. Keep it
                                                up!
                                            </blockquote>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">10hr</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck4"
                                                           defaultChecked/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck4"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div className="avatar avatar-sm avatar-circle">
                                                    <img className="avatar-img"
                                                         src="assets\img\160x160\img10.jpg"
                                                         alt="Image Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Ruby Walter</span>
                                            <p className="card-text font-size-sm">joined the
                                                Slack group HS Team</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">3dy</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck3"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck3"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div className="avatar avatar-sm avatar-circle">
                                                    <img className="avatar-img"
                                                         src="assets\svg\brands\google.svg"
                                                         alt="Image Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">from Google</span>
                                            <p className="card-text font-size-sm">Start using
                                                forms to capture the information of prospects
                                                visiting your Google website</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">17dy</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck5"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck5"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div className="avatar avatar-sm avatar-circle">
                                                    <img className="avatar-img"
                                                         src="assets\img\160x160\img7.jpg"
                                                         alt="Image Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Sara Villar</span>
                                            <p className="card-text font-size-sm">completed <i
                                                className="tio-folder-bookmarked text-primary"/> FD-7
                                                task</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">2mn</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="notificationNavTwo" role="tabpanel"
                             aria-labelledby="notificationNavTwo-tab">
                            <ul className="list-group list-group-flush navbar-card-list-group">
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck7"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck7"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div
                                                    className="avatar avatar-sm avatar-soft-dark avatar-circle">
                                                    <span className="avatar-initials">A</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Anne Richard</span>
                                            <p className="card-text font-size-sm">accepted your
                                                invitation to join Notion</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">1dy</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck6"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck6"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div className="avatar avatar-sm avatar-circle">
                                                    <img className="avatar-img"
                                                         src="assets\img\160x160\img5.jpg"
                                                         alt="Image Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Finch Hoot</span>
                                            <p className="card-text font-size-sm">left Slack
                                                group HS projects</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">3dy</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck8"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck8"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div
                                                    className="avatar avatar-sm avatar-dark avatar-circle">
                                                    <span className="avatar-initials">HS</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Htmlstream</span>
                                            <p className="card-text font-size-sm">you earned a
                                                "Top endorsed" <i
                                                    className="tio-verified text-primary"/> badge
                                            </p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">6dy</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck9"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck9"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div className="avatar avatar-sm avatar-circle">
                                                    <img className="avatar-img"
                                                         src="assets\img\160x160\img8.jpg"
                                                         alt="Image Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Linda Bates</span>
                                            <p className="card-text font-size-sm">Accepted your
                                                connection</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">17dy</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                                {/* Item */}
                                <li className="list-group-item custom-checkbox-list-wrapper">
                                    <div className="row">
                                        <div className="col-auto position-static">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="custom-control custom-checkbox custom-checkbox-list">
                                                    <input type="checkbox"
                                                           className="custom-control-input"
                                                           id="notificationCheck10"/>
                                                    <label className="custom-control-label"
                                                           htmlFor="notificationCheck10"/>
                                                    <span
                                                        className="custom-checkbox-list-stretched-bg"/>
                                                </div>
                                                <div
                                                    className="avatar avatar-sm avatar-soft-dark avatar-circle">
                                                    <span className="avatar-initials">L</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col ml-n3">
                                            <span className="card-title h5">Lewis Clarke</span>
                                            <p className="card-text font-size-sm">completed <i
                                                className="tio-folder-bookmarked text-primary"/> FD-134
                                                task</p>
                                        </div>
                                        <small
                                            className="col-auto text-muted text-cap">2mn</small>
                                    </div>
                                    <a className="stretched-link" href="#"/>
                                </li>
                                {/* End Item */}
                            </ul>
                        </div>
                    </div>
                    {/* End Tab Content */}
                </div>
                {/* End Body */}
                {/* Card Footer */}
                <a className="card-footer text-center" href="#">
                    View all notifications
                    <i className="tio-chevron-right"/>
                </a>
                {/* End Card Footer */}
            </div>
            <div id="sidebarMain" className="position-relative">
                <aside
                    className="js-navbar-vertical-aside navbar navbar-vertical-aside navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered">
                    <div className="navbar-vertical-container">
                        <div className="navbar-vertical-footer-offset">
                            <div className="navbar-brand-wrapper justify-content-between border-bottom">
                                {/* Logo */}
                                <a className="navbar-brand" href="index.html" aria-label="Front">
                                    <img className="navbar-brand-logo" src="assets\svg\logos\logo.svg" alt="Logo"/>
                                    <img className="navbar-brand-logo-mini" src="assets\svg\logos\logo-short.svg"
                                         alt="Logo"/>
                                </a>
                                {/* End Logo */}
                                {/* Navbar Vertical Toggle */}
                                {/* Notification */}
                                <div className="hs-unfold">
                                    <a className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                                       href="javascript:;" data-hs-unfold-options="{
           &quot;target&quot;: &quot;#notificationDropdown&quot;,
           &quot;type&quot;: &quot;css-animation&quot;
         }">
                                        <i className="tio-notifications-on-outlined"/>
                                        <span className="btn-status btn-sm-status btn-status-danger"/>
                                    </a>

                                </div>
                                {/* End Notification */}

                                {/* End Navbar Vertical Toggle */}
                            </div>
                            {/* Content */}

                            <div className="navbar-vertical-content">
                                {
                                    memberState.currentMember
                                    &&
                                    <ul className="navbar-nav navbar-nav-lg nav-tabs border-bottom">
                                        <li className="navbar-vertical-aside-has-menu">
                                            <div className="nav-link position-relative profile-detail">
                                                <Link to={'/profile/' + memberState.currentMember.profileId}
                                                      className="d-flex">
                                                    <div className="avatar avatar-sm avatar-circle mr-2">
                                                        {
                                                            memberState.currentMember.avatar
                                                            &&
                                                            <img className="avatar-img"
                                                                 src={memberState.currentMember.avatar.srcImage}
                                                                 alt="Image Description"/>
                                                        }
                                                    </div>
                                                    <span
                                                        className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                                                <div className="media-body">
                                                    <span
                                                        className="card-title h5">{memberState.currentMember.name && titleCase(memberState.currentMember.name)}</span>
                                                    <span className="card-text">{memberState.currentMember.email}</span>
                                                </div>
                                            </span>
                                                </Link>

                                                <Logout/>

                                            </div>
                                        </li>
                                    </ul>
                                }
                                <ul className="navbar-nav navbar-nav-lg nav-tab sborder-bottom">
                                    <li className="nav-item">
                                        <NavLink className="js-nav-tooltip-link nav-link" activeClassName="active"
                                                 to="/encounters"
                                                 title="Welcome page" data-placement="left">
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Bắt gặp</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="js-nav-tooltip-link nav-link" activeClassName="active"
                                                 to="/search"
                                                 title="Welcome page" data-placement="left">
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Người xung quanh</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="js-nav-tooltip-link nav-link" activeClassName="active"
                                                 to="/matched"
                                                 title="Welcome page" data-placement="left">
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Kết đôi</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="js-nav-tooltip-link nav-link" activeClassName="active"
                                                 to="/history"
                                                 title="Welcome page" data-placement="left">
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Lịch sử</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="js-nav-tooltip-link nav-link" activeClassName="active"
                                                 to="/favourite"
                                                 title="Welcome page" data-placement="left">
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Mục yêu thích</span>
                                        </NavLink>
                                    </li>
                                    <li className="top-trend">
                                        <div className="trend">

                                            <span className="divider text-uppercase font-weight-bolder">nổi bật</span>
                                        </div>
                                        <div className="list-trend">
                                        </div>
                                        <div className="list-trend">
                                            <a href="/" className="user-box">
                                                <span className="avatar" data-toggle="tooltip" data-placement="top"
                                                      title="Xuân vũ">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                            <a href="/" className="user-box">
                                                <span className="avatar">
                                                  <img className="avatar-img" src="../assets/img/160x160/img10.jpg"
                                                       alt="Image Description"/>
                                                </span>
                                            </a>
                                        </div>
                                    </li>
                                    {/* Front Builder */}
                                    <li className="nav-item nav-footer-item ">
                                        <a className="d-none d-md-flex js-hs-unfold-invoker nav-link nav-link-toggle"
                                           href='javascript:;' data-hs-unfold-options="{
           &quot;target&quot;: &quot;#styleSwitcherDropdown&quot;,
           &quot;type&quot;: &quot;css-animation&quot;,
           &quot;animationIn&quot;: &quot;fadeInRight&quot;,
           &quot;animationOut&quot;: &quot;fadeOutRight&quot;,
           &quot;hasOverlay&quot;: true,
           &quot;smartPositionOff&quot;: true
         }">
                                            <i className="tio-tune nav-icon"/>
                                        </a>
                                        <a className="d-flex d-md-none nav-link nav-link-toggle" href='javascript:;'>
                                            <i className="tio-tune nav-icon"/>
                                        </a>
                                    </li>
                                    {/* End Front Builder */}
                                    {/* Help */}
                                    <li className="navbar-vertical-aside-has-menu nav-footer-item ">
                                        <a className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle "
                                           href='javascript:;' title="Help">
                                            <i className="tio-home-vs-1-outlined nav-icon"/>
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Help</span>
                                        </a>
                                        <ul className="js-navbar-vertical-aside-submenu nav nav-sub">
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;'
                                                   title="Resources & tutorials">
                                                    <i className="tio-book-outlined dropdown-item-icon"/> Resources &amp; tutorials
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="Keyboard shortcuts">
                                                    <i className="tio-command-key dropdown-item-icon"/> Keyboard
                                                    shortcuts
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="Connect other apps">
                                                    <i className="tio-alt dropdown-item-icon"/> Connect other apps
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="What's new?">
                                                    <i className="tio-gift dropdown-item-icon"/> What's new?
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="Contact support">
                                                    <i className="tio-chat-outlined dropdown-item-icon"/> Contact
                                                    support
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* End Help */}
                                    {/* Language */}
                                    <li className="navbar-vertical-aside-has-menu nav-footer-item ">
                                        <a className="js-navbar-vertical-aside-menu-link nav-link nav-link-toggle "
                                           href='javascript:;' title="Language">
                                            <img className="avatar avatar-xss avatar-circle"
                                                 src="assets\vendor\flag-icon-css\flags\1x1\us.svg"
                                                 alt="United States Flag"/>
                                            <span
                                                className="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">Language</span>
                                        </a>
                                        <ul className="js-navbar-vertical-aside-submenu nav nav-sub">
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="English (US)">
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\us.svg" alt="Flag"/>
                                                    English (US)
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="English (UK)">
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\gb.svg" alt="Flag"/>
                                                    English (UK)
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="Deutsch">
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\de.svg" alt="Flag"/>
                                                    Deutsch
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="Dansk">
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\dk.svg" alt="Flag"/>
                                                    Dansk
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="Italiano">
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\it.svg" alt="Flag"/>
                                                    Italiano
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='javascript:;' title="中文 (繁體)">
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\cn.svg" alt="Flag"/>
                                                    中文 (繁體)
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* End Language */}
                                </ul>
                            </div>
                            {/* End Content */}
                            {/* Footer */}
                            <div className="navbar-vertical-footer">
                                <ul className="navbar-vertical-footer-list">
                                    <li className="navbar-vertical-footer-list-item">
                                        <Filter/>
                                    </li>
                                    <li className="navbar-vertical-footer-list-item">
                                        {/* Other Links */}
                                        <div className="hs-unfold">
                                            <a className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                                               href='javascript:;' data-hs-unfold-options="{
            &quot;target&quot;: &quot;#otherLinksDropdown&quot;,
            &quot;type&quot;: &quot;css-animation&quot;,
            &quot;animationIn&quot;: &quot;slideInDown&quot;,
            &quot;hideOnScroll&quot;: true
           }">
                                                <i className="tio-help-outlined"/>
                                            </a>
                                            <div id="otherLinksDropdown"
                                                 className="hs-unfold-content dropdown-unfold dropdown-menu navbar-vertical-footer-dropdown">
                                                <span className="dropdown-header">Help</span>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-book-outlined dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2"
                                                          title="Resources & tutorials">Resources &amp; tutorials</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-command-key dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2" title="Keyboard shortcuts">Keyboard shortcuts</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-alt dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2" title="Connect other apps">Connect other apps</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-gift dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2"
                                                          title="What's new?">What's new?</span>
                                                </a>
                                                <div className="dropdown-divider"/>
                                                <span className="dropdown-header">Contacts</span>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-chat-outlined dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2" title="Contact support">Contact support</span>
                                                </a>
                                            </div>
                                        </div>
                                        {/* End Other Links */}
                                    </li>
                                    <li className="navbar-vertical-footer-list-item">
                                        {/* Language */}
                                        <div className="hs-unfold">
                                            <a className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                                               href='javascript:;' data-hs-unfold-options="{
            &quot;target&quot;: &quot;#languageDropdown&quot;,
            &quot;type&quot;: &quot;css-animation&quot;,
            &quot;animationIn&quot;: &quot;slideInDown&quot;,
            &quot;hideOnScroll&quot;: true
           }">
                                                <img className="avatar avatar-xss avatar-circle"
                                                     src="assets\vendor\flag-icon-css\flags\1x1\us.svg"
                                                     alt="United States Flag"/>
                                            </a>
                                            <div id="languageDropdown"
                                                 className="hs-unfold-content dropdown-unfold dropdown-menu navbar-vertical-footer-dropdown">
                                                <span className="dropdown-header">Select language</span>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\us.svg" alt="Flag"/>
                                                    <span className="text-truncate pr-2"
                                                          title="English">English (US)</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\gb.svg" alt="Flag"/>
                                                    <span className="text-truncate pr-2"
                                                          title="English">English (UK)</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\de.svg" alt="Flag"/>
                                                    <span className="text-truncate pr-2" title="Deutsch">Deutsch</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\dk.svg" alt="Flag"/>
                                                    <span className="text-truncate pr-2" title="Dansk">Dansk</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\it.svg" alt="Flag"/>
                                                    <span className="text-truncate pr-2"
                                                          title="Italiano">Italiano</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <img className="avatar avatar-xss avatar-circle mr-2"
                                                         src="assets\vendor\flag-icon-css\flags\1x1\cn.svg" alt="Flag"/>
                                                    <span className="text-truncate pr-2" title="中文 (繁體)">中文 (繁體)</span>
                                                </a>
                                            </div>
                                        </div>
                                        {/* End Language */}
                                    </li>
                                    <li className="navbar-vertical-footer-list-item">
                                        {/* Other Links */}
                                        <div className="hs-unfold">
                                            <a className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                                               href='javascript:;' data-hs-unfold-options="{
            &quot;target&quot;: &quot;#otherLinksDropdown&quot;,
            &quot;type&quot;: &quot;css-animation&quot;,
            &quot;animationIn&quot;: &quot;slideInDown&quot;,
            &quot;hideOnScroll&quot;: true
           }">
                                                <i className="tio-messenger"/>
                                            </a>
                                            <div id="otherLinksDropdown"
                                                 className="hs-unfold-content dropdown-unfold dropdown-menu navbar-vertical-footer-dropdown">
                                                <span className="dropdown-header">Help</span>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-book-outlined dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2"
                                                          title="Resources & tutorials">Resources &amp; tutorials</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-command-key dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2" title="Keyboard shortcuts">Keyboard shortcuts</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-alt dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2" title="Connect other apps">Connect other apps</span>
                                                </a>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-gift dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2"
                                                          title="What's new?">What's new?</span>
                                                </a>
                                                <div className="dropdown-divider"/>
                                                <span className="dropdown-header">Contacts</span>
                                                <a className="dropdown-item" href='javascript:;'>
                                                    <i className="tio-chat-outlined dropdown-item-icon"/>
                                                    <span className="text-truncate pr-2" title="Contact support">Contact support</span>
                                                </a>
                                            </div>
                                        </div>
                                        {/* End Other Links */}
                                    </li>
                                </ul>
                            </div>
                            {/* End Footer */}
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Index;
