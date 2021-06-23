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
            {/* Search Form */}
            <div id="searchDropdown" className="hs-unfold-content dropdown-unfold search-fullwidth d-md-none">
                <form className="input-group input-group-merge input-group-borderless">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="tio-search"/>
                        </div>
                    </div>
                    <input className="form-control rounded-0" type="search" placeholder="Search in front"
                           aria-label="Search in front"/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <div className="hs-unfold">
                                <a className="js-hs-unfold-invoker" href='javascript:;' data-hs-unfold-options="{
             &quot;target&quot;: &quot;#searchDropdown&quot;,
             &quot;type&quot;: &quot;css-animation&quot;,
             &quot;animationIn&quot;: &quot;fadeIn&quot;,
             &quot;hasOverlay&quot;: &quot;rgba(46, 52, 81, 0.1)&quot;,
             &quot;closeBreakpoint&quot;: &quot;md&quot;
           }">
                                    <i className="tio-clear tio-lg"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* End Search Form */}
            {/* ========== HEADER ========== */}
            {/* ========== END HEADER ========== */}
            {/* ========== MAIN CONTENT ========== */}
            {/* Navbar Vertical */}
            {/* End Navbar Vertical */}

            <main id="content" role="main" className="main pointer-event">
                {/* Content */}
                <div className="content container-fluid">
                    <Switch>
                        {/*{*/}
                        {/*    routes.map((route, i) => (*/}
                        {/*        <RouteWithSubRoutes key={i} {...route} />*/}
                        {/*    ))*/}
                        {/*}*/}

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
                </div>
            </main>
            {/* ========== END MAIN CONTENT ========== */}
            {/* ========== SECONDARY CONTENTS ========== */}
            {/* Keyboard Shortcuts */}
            <div id="keyboardShortcutsSidebar"
                 className="hs-unfold-content sidebar sidebar-bordered sidebar-box-shadow">
                <div className="card card-lg sidebar-card">
                    <div className="card-header">
                        <h4 className="card-header-title">Keyboard shortcuts</h4>
                        {/* Toggle Button */}
                        <a className="js-hs-unfold-invoker btn btn-icon btn-xs btn-ghost-dark ml-2" href='javascript:;'
                           data-hs-unfold-options="{
          &quot;target&quot;: &quot;#keyboardShortcutsSidebar&quot;,
          &quot;type&quot;: &quot;css-animation&quot;,
          &quot;animationIn&quot;: &quot;fadeInRight&quot;,
          &quot;animationOut&quot;: &quot;fadeOutRight&quot;,
          &quot;hasOverlay&quot;: true,
          &quot;smartPositionOff&quot;: true
         }">
                            <i className="tio-clear tio-lg"/>
                        </a>
                        {/* End Toggle Button */}
                    </div>
                    {/* Body */}
                    <div className="card-body sidebar-body sidebar-scrollbar">
                        <div className="list-group list-group-sm list-group-flush list-group-no-gutters mb-5">
                            <div className="list-group-item">
                                <h5 className="mb-1">Formatting</h5>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span className="font-weight-bold">Bold</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">b</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <em>italic</em>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">i</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <u>Underline</u>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">u</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <s>Strikethrough</s>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">Alt</kbd>
                                        <small className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">s</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span className="small">Small text</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">s</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <mark>Highlight</mark>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">e</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-group list-group-sm list-group-flush list-group-no-gutters mb-5">
                            <div className="list-group-item">
                                <h5 className="mb-1">Insert</h5>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Mention person <a href='javascript:;'>(@Brian)</a></span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">@</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Link to doc <a href='javascript:;'>(+Meeting notes)</a></span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">+</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <a href='javascript:;'>#hashtag</a>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">#hashtag</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Date</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">/date</kbd>
                                        <kbd className="d-inline-block mb-1">Space</kbd>
                                        <kbd className="d-inline-block mb-1">/datetime</kbd>
                                        <kbd className="d-inline-block mb-1">/datetime</kbd>
                                        <kbd className="d-inline-block mb-1">Space</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Time</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">/time</kbd>
                                        <kbd className="d-inline-block mb-1">Space</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Note box</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">/note</kbd>
                                        <kbd className="d-inline-block mb-1">Enter</kbd>
                                        <kbd className="d-inline-block mb-1">/note red</kbd>
                                        <kbd className="d-inline-block mb-1">/note red</kbd>
                                        <kbd className="d-inline-block mb-1">Enter</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-group list-group-sm list-group-flush list-group-no-gutters mb-5">
                            <div className="list-group-item">
                                <h5 className="mb-1">Editing</h5>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Find and replace</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">r</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Find next</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">n</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Find previous</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">p</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Indent</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Tab</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Un-indent</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">Tab</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Move line up</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1"><i
                                        className="tio-arrow-large-upward-outlined"/></kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Move line down</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1"><i
                                        className="tio-arrow-large-downward-outlined font-size-sm"/></kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Add a comment</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">Alt</kbd>
                                        <small className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">m</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Undo</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">z</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Redo</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">y</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-group list-group-sm list-group-flush list-group-no-gutters">
                            <div className="list-group-item">
                                <h5 className="mb-1">Application</h5>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Create new doc</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">Alt</kbd>
                                        <small className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">n</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Present</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">p</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Share</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">s</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Search docs</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">o</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item">
                                <div className="row align-items-center">
                                    <div className="col-5">
                                        <span>Keyboard shortcuts</span>
                                    </div>
                                    <div className="col-7 text-right">
                                        <kbd className="d-inline-block mb-1">Ctrl</kbd> <small
                                        className="text-muted">+</small> <kbd
                                        className="d-inline-block mb-1">Shift</kbd> <small
                                        className="text-muted">+</small> <kbd className="d-inline-block mb-1">/</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Body */}
                </div>
            </div>
            {/* End Keyboard Shortcuts */}
            {/* Activity */}
            <div id="activitySidebar" className="hs-unfold-content sidebar sidebar-bordered sidebar-box-shadow">
                <div className="card card-lg sidebar-card">
                    <div className="card-header">
                        <h4 className="card-header-title">Activity stream</h4>
                        {/* Toggle Button */}
                        <a className="js-hs-unfold-invoker btn btn-icon btn-xs btn-ghost-dark ml-2" href='javascript:;'
                           data-hs-unfold-options="{
        &quot;target&quot;: &quot;#activitySidebar&quot;,
        &quot;type&quot;: &quot;css-animation&quot;,
        &quot;animationIn&quot;: &quot;fadeInRight&quot;,
        &quot;animationOut&quot;: &quot;fadeOutRight&quot;,
        &quot;hasOverlay&quot;: true,
        &quot;smartPositionOff&quot;: true
       }">
                            <i className="tio-clear tio-lg"/>
                        </a>
                        {/* End Toggle Button */}
                    </div>
                    {/* Body */}
                    <div className="card-body sidebar-body sidebar-scrollbar">
                        {/* Step */}
                        <ul className="step step-icon-sm step-avatar-sm">
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
                                    <div className="step-avatar">
                                        <img className="step-avatar-img" src="assets\img\160x160\img9.jpg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="step-content">
                                        <h5 className="mb-1">Iana Robinson</h5>
                                        <p className="font-size-sm mb-1">Added 2 files to task <a
                                            className="text-uppercase" href='javascript:;'><i
                                            className="tio-folder-bookmarked"/> Fd-7</a></p>
                                        <ul className="list-group list-group-sm">
                                            {/* List Item */}
                                            <li className="list-group-item list-group-item-light">
                                                <div className="row gx-1">
                                                    <div className="col-6">
                                                        <div className="media">
                          <span className="mt-1 mr-2">
                            <img className="avatar avatar-xs" src="assets\svg\brands\excel.svg"
                                 alt="Image Description"/>
                          </span>
                                                            <div className="media-body text-truncate">
                                                                <span
                                                                    className="d-block font-size-sm text-dark text-truncate"
                                                                    title="weekly-reports.xls">weekly-reports.xls</span>
                                                                <small className="d-block text-muted">12kb</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="media">
                          <span className="mt-1 mr-2">
                            <img className="avatar avatar-xs" src="assets\svg\brands\word.svg" alt="Image Description"/>
                          </span>
                                                            <div className="media-body text-truncate">
                                                                <span
                                                                    className="d-block font-size-sm text-dark text-truncate"
                                                                    title="weekly-reports.xls">weekly-reports.xls</span>
                                                                <small className="d-block text-muted">4kb</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {/* End List Item */}
                                        </ul>
                                        <small className="text-muted text-uppercase">Now</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
                                    <span className="step-icon step-icon-soft-dark">B</span>
                                    <div className="step-content">
                                        <h5 className="mb-1">Bob Dean</h5>
                                        <p className="font-size-sm mb-1">Marked <a className="text-uppercase"
                                                                                   href='javascript:;'><i
                                            className="tio-folder-bookmarked"/> Fr-6</a> as <span
                                            className="badge badge-soft-success badge-pill"><span
                                            className="legend-indicator bg-success"/>"Completed"</span></p>
                                        <small className="text-muted text-uppercase">Today</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
                                    <div className="step-avatar">
                                        <img className="step-avatar-img" src="assets\img\160x160\img3.jpg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="step-content">
                                        <h5 className="h5 mb-1">Crane</h5>
                                        <p className="font-size-sm mb-1">Added 5 card to <a
                                            href='javascript:;'>Payments</a></p>
                                        <ul className="list-group list-group-sm">
                                            <li className="list-group-item list-group-item-light">
                                                <div className="row gx-1">
                                                    <div className="col">
                                                        <img className="img-fluid rounded ie-sidebar-activity-img"
                                                             src="assets\svg\illustrations\card-1.svg"
                                                             alt="Image Description"/>
                                                    </div>
                                                    <div className="col">
                                                        <img className="img-fluid rounded ie-sidebar-activity-img"
                                                             src="assets\svg\illustrations\card-2.svg"
                                                             alt="Image Description"/>
                                                    </div>
                                                    <div className="col">
                                                        <img className="img-fluid rounded ie-sidebar-activity-img"
                                                             src="assets\svg\illustrations\card-3.svg"
                                                             alt="Image Description"/>
                                                    </div>
                                                    <div className="col-auto align-self-center">
                                                        <div className="text-center">
                                                            <a href='javascript:;'>+2</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <small className="text-muted text-uppercase">May 12</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
                                    <span className="step-icon step-icon-soft-info">D</span>
                                    <div className="step-content">
                                        <h5 className="mb-1">David Lidell</h5>
                                        <p className="font-size-sm mb-1">Added a new member to Front Dashboard</p>
                                        <small className="text-muted text-uppercase">May 15</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
                                    <div className="step-avatar">
                                        <img className="step-avatar-img" src="assets\img\160x160\img7.jpg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="step-content">
                                        <h5 className="mb-1">Rachel King</h5>
                                        <p className="font-size-sm mb-1">Marked <a className="text-uppercase"
                                                                                   href='javascript:;'><i
                                            className="tio-folder-bookmarked"/> Fr-3</a> as <span
                                            className="badge badge-soft-success badge-pill"><span
                                            className="legend-indicator bg-success"/>"Completed"</span></p>
                                        <small className="text-muted text-uppercase">Apr 29</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
                                    <div className="step-avatar">
                                        <img className="step-avatar-img" src="assets\img\160x160\img5.jpg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="step-content">
                                        <h5 className="mb-1">Finch Hoot</h5>
                                        <p className="font-size-sm mb-1">Earned a "Top endorsed" <i
                                            className="tio-verified text-primary"/> badge</p>
                                        <small className="text-muted text-uppercase">Apr 06</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                            {/* Step Item */}
                            <li className="step-item">
                                <div className="step-content-wrapper">
              <span className="step-icon step-icon-soft-primary">
                <i className="tio-user"/>
              </span>
                                    <div className="step-content">
                                        <h5 className="mb-1">Project status updated</h5>
                                        <p className="font-size-sm mb-1">Marked <a className="text-uppercase"
                                                                                   href='javascript:;'><i
                                            className="tio-folder-bookmarked"/> Fr-3</a> as <span
                                            className="badge badge-soft-primary badge-pill"><span
                                            className="legend-indicator bg-primary"/>"In progress"</span></p>
                                        <small className="text-muted text-uppercase">Feb 10</small>
                                    </div>
                                </div>
                            </li>
                            {/* End Step Item */}
                        </ul>
                        {/* End Step */}
                        <a className="btn btn-block btn-white" href='javascript:;'>View all <i
                            className="tio-chevron-right"/></a>
                    </div>
                    {/* End Body */}
                </div>
            </div>
            {/* End Activity */}
            {/* Welcome Message CustomModal */}
            <div className="modal fade" id="welcomeMessageModal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-close">
                            <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"
                                    data-dismiss="modal" aria-label="Close">
                                <i className="tio-clear tio-lg"/>
                            </button>
                        </div>
                        {/* End Header */}
                        {/* Body */}
                        <div className="modal-body p-sm-5">
                            <div className="text-center">
                                <div className="w-75 w-sm-50 mx-auto mb-4">
                                    <img className="img-fluid" src="assets\svg\illustrations\graphs.svg"
                                         alt="Image Description"/>
                                </div>
                                <h4 className="h1">Welcome to Front</h4>
                                <p>We're happy to see you in our community.</p>
                            </div>
                        </div>
                        {/* End Body */}
                        {/* Footer */}
                        <div className="modal-footer d-block text-center py-sm-5">
                            <small className="text-cap mb-4">Trusted by the world's best teams</small>
                            <div className="w-85 mx-auto">
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <img className="img-fluid ie-welcome-brands"
                                             src="assets\svg\brands\gitlab-gray.svg" alt="Image Description"/>
                                    </div>
                                    <div className="col">
                                        <img className="img-fluid ie-welcome-brands"
                                             src="assets\svg\brands\fitbit-gray.svg" alt="Image Description"/>
                                    </div>
                                    <div className="col">
                                        <img className="img-fluid ie-welcome-brands"
                                             src="assets\svg\brands\flow-xo-gray.svg" alt="Image Description"/>
                                    </div>
                                    <div className="col">
                                        <img className="img-fluid ie-welcome-brands"
                                             src="assets\svg\brands\layar-gray.svg" alt="Image Description"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Footer */}
                    </div>
                </div>
            </div>
            {/* End Welcome Message CustomModal */}
            {/* Create a new user CustomModal */}
            <div className="modal fade" id="inviteUserModal" tabIndex={-1} role="dialog"
                 aria-labelledby="inviteUserModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <form className="modal-content">
                        {/* Header */}
                        <div className="modal-header">
                            <h4 id="inviteUserModalTitle" className="modal-title">Invite users</h4>
                            <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary"
                                    data-dismiss="modal" aria-label="Close">
                                <i className="tio-clear tio-lg"/>
                            </button>
                        </div>
                        {/* End Header */}
                        {/* Body */}
                        <div className="modal-body">
                            {/* Form Group */}
                            <div className="form-group">
                                <div className="input-group input-group-merge mb-2 mb-sm-0">
                                    <div className="input-group-prepend" id="fullName">
                <span className="input-group-text">
                  <i className="tio-search"/>
                </span>
                                    </div>
                                    <input type="text" className="form-control" name="fullName"
                                           placeholder="Search name or emails" aria-label="Search name or emails"
                                           aria-describedby="fullName"/>
                                    <div className="input-group-append input-group-append-last-sm-down-none">
                                        {/* Select */}
                                        <div id="permissionSelect" className="select2-custom select2-custom-right">
                                            <select className="js-select2-custom custom-select" size={1}
                                                    defaultValue="guest"
                                                    style={{opacity: 0}} data-hs-select2-options="{
                        &quot;dropdownParent&quot;: &quot;#permissionSelect&quot;,
                        &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                        &quot;dropdownAutoWidth&quot;: true,
                        &quot;dropdownWidth&quot;: &quot;11rem&quot;
                      }">
                                                <option value="guest">Guest</option>
                                                <option value="can edit">Can edit</option>
                                                <option value="can comment">Can comment</option>
                                                <option value="full access">Full access</option>
                                            </select>
                                        </div>
                                        {/* End Select */}
                                        <a className="btn btn-primary d-none d-sm-block" href='javascript:;'>Invite</a>
                                    </div>
                                </div>
                                <a className="btn btn-block btn-primary d-sm-none" href='javascript:;'>Invite</a>
                            </div>
                            {/* End Form Group */}
                            <div className="form-row">
                                <h5 className="col modal-title">Invite users</h5>
                                <div className="col-auto">
                                    <a className="d-flex align-items-center font-size-sm text-body" href='javascript:;'>
                                        <img className="avatar avatar-xss mr-2" src="assets\svg\brands\gmail.svg"
                                             alt="Image Description"/>
                                        Import contacts
                                    </a>
                                </div>
                            </div>
                            <hr className="mt-2"/>
                            <ul className="list-unstyled list-unstyled-py-4">
                                {/* List Group Item */}
                                <li>
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-circle mr-3">
                                            <img className="avatar-img" src="assets\img\160x160\img10.jpg"
                                                 alt="Image Description"/>
                                        </div>
                                        <div className="media-body">
                                            <div className="row align-items-center">
                                                <div className="col-sm">
                                                    <h5 className="text-body mb-0">Amanda Harvey <i
                                                        className="tio-verified text-primary" data-toggle="tooltip"
                                                        data-placement="top" title="Top endorsed"/></h5>
                                                    <span className="d-block font-size-sm">amanda@example.com</span>
                                                </div>
                                                <div className="col-sm">
                                                    {/* Select */}
                                                    <div id="inviteUserSelect1"
                                                         className="select2-custom select2-custom-sm-right d-sm-flex justify-content-sm-end">
                                                        <select className="js-select2-custom custom-select-sm" size={1}
                                                                defaultValue="guest"
                                                                style={{opacity: 0}} data-hs-select2-options="{
                              &quot;dropdownParent&quot;: &quot;#inviteUserSelect1&quot;,
                              &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                              &quot;customClass&quot;: &quot;custom-select custom-select-sm custom-select-borderless pl-0&quot;,
                              &quot;dropdownAutoWidth&quot;: true,
                              &quot;width&quot;: true
                            }">
                                                            <option value="guest">Guest</option>
                                                            <option value="can edit">Can edit</option>
                                                            <option value="can comment">Can comment</option>
                                                            <option value="full access">Full access</option>
                                                            <option value="remove"
                                                                    data-option-template="<span class=&quot;text-danger&quot;>Remove</span>">Remove
                                                            </option>
                                                        </select>
                                                    </div>
                                                    {/* End Select */}
                                                </div>
                                            </div>
                                            {/* End Row */}
                                        </div>
                                    </div>
                                </li>
                                {/* End List Group Item */}
                                {/* List Group Item */}
                                <li>
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-circle mr-3">
                                            <img className="avatar-img" src="assets\img\160x160\img3.jpg"
                                                 alt="Image Description"/>
                                        </div>
                                        <div className="media-body">
                                            <div className="row align-items-center">
                                                <div className="col-sm">
                                                    <h5 className="text-body mb-0">David Harrison</h5>
                                                    <span className="d-block font-size-sm">david@example.com</span>
                                                </div>
                                                <div className="col-sm">
                                                    {/* Select */}
                                                    <div id="inviteUserSelect2"
                                                         className="select2-custom select2-custom-sm-right d-sm-flex justify-content-sm-end">
                                                        <select className="js-select2-custom custom-select-sm" size={1}
                                                                defaultValue="guest"
                                                                style={{opacity: 0}} data-hs-select2-options="{
                              &quot;dropdownParent&quot;: &quot;#inviteUserSelect2&quot;,
                              &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                              &quot;customClass&quot;: &quot;custom-select custom-select-sm custom-select-borderless pl-0&quot;,
                              &quot;dropdownAutoWidth&quot;: true,
                              &quot;width&quot;: true
                            }">
                                                            <option value="guest">Guest</option>
                                                            <option value="can edit">Can edit</option>
                                                            <option value="can comment">Can comment</option>
                                                            <option value="full access">Full access</option>
                                                            <option value="remove"
                                                                    data-option-template="<span class=&quot;text-danger&quot;>Remove</span>">Remove
                                                            </option>
                                                        </select>
                                                    </div>
                                                    {/* End Select */}
                                                </div>
                                            </div>
                                            {/* End Row */}
                                        </div>
                                    </div>
                                </li>
                                {/* End List Group Item */}
                                {/* List Group Item */}
                                <li>
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-circle mr-3">
                                            <img className="avatar-img" src="assets\img\160x160\img9.jpg"
                                                 alt="Image Description"/>
                                        </div>
                                        <div className="media-body">
                                            <div className="row align-items-center">
                                                <div className="col-sm">
                                                    <h5 className="text-body mb-0">Ella Lauda <i
                                                        className="tio-verified text-primary" data-toggle="tooltip"
                                                        data-placement="top" title="Top endorsed"/></h5>
                                                    <span className="d-block font-size-sm">Markvt@example.com</span>
                                                </div>
                                                <div className="col-sm">
                                                    {/* Select */}
                                                    <div id="inviteUserSelect4"
                                                         className="select2-custom select2-custom-sm-right d-sm-flex justify-content-sm-end">
                                                        <select className="js-select2-custom custom-select-sm" size={1}
                                                                defaultValue="guest"
                                                                style={{opacity: 0}} data-hs-select2-options="{
                              &quot;dropdownParent&quot;: &quot;#inviteUserSelect4&quot;,
                              &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                              &quot;customClass&quot;: &quot;custom-select custom-select-sm custom-select-borderless pl-0&quot;,
                              &quot;dropdownAutoWidth&quot;: true,
                              &quot;width&quot;: true
                            }">
                                                            <option value="guest">Guest</option>
                                                            <option value="can edit">Can edit</option>
                                                            <option value="can comment">Can comment</option>
                                                            <option value="full access">Full access</option>
                                                            <option value="remove"
                                                                    data-option-template="<span class=&quot;text-danger&quot;>Remove</span>">Remove
                                                            </option>
                                                        </select>
                                                    </div>
                                                    {/* End Select */}
                                                </div>
                                            </div>
                                            {/* End Row */}
                                        </div>
                                    </div>
                                </li>
                                {/* End List Group Item */}
                                {/* List Group Item */}
                                <li>
                                    <div className="media">
                                        <div className="avatar avatar-sm avatar-soft-dark avatar-circle mr-3">
                                            <span className="avatar-initials">B</span>
                                        </div>
                                        <div className="media-body">
                                            <div className="row align-items-center">
                                                <div className="col-sm">
                                                    <h5 className="text-body mb-0">Bob Dean</h5>
                                                    <span className="d-block font-size-sm">bob@example.com</span>
                                                </div>
                                                <div className="col-sm">
                                                    {/* Select */}
                                                    <div id="inviteUserSelect3"
                                                         className="select2-custom select2-custom-sm-right d-sm-flex justify-content-sm-end">
                                                        <select className="js-select2-custom custom-select-sm" size={1}
                                                                defaultValue="guest"
                                                                style={{opacity: 0}} data-hs-select2-options="{
                              &quot;dropdownParent&quot;: &quot;#inviteUserSelect3&quot;,
                              &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                              &quot;customClass&quot;: &quot;custom-select custom-select-sm custom-select-borderless pl-0&quot;,
                              &quot;dropdownAutoWidth&quot;: true,
                              &quot;width&quot;: true
                            }">
                                                            <option value="guest">Guest</option>
                                                            <option value="can edit">Can edit</option>
                                                            <option value="can comment">Can comment</option>
                                                            <option value="full access">Full access</option>
                                                            <option value="remove"
                                                                    data-option-template="<span class=&quot;text-danger&quot;>Remove</span>">Remove
                                                            </option>
                                                        </select>
                                                    </div>
                                                    {/* End Select */}
                                                </div>
                                            </div>
                                            {/* End Row */}
                                        </div>
                                    </div>
                                </li>
                                {/* End List Group Item */}
                            </ul>
                        </div>
                        {/* End Body */}
                        {/* Footer */}
                        <div className="modal-footer justify-content-start">
                            <div className="row align-items-center flex-grow-1 mx-n2">
                                <div className="col-sm-9 mb-2 mb-sm-0">
                                    <input type="hidden" id="inviteUserPublicClipboard"
                                           defaultValue="https://themes.getbootstrap.com/product/front-multipurpose-responsive-template/"/>
                                    <p className="modal-footer-text">The public share <a href='javascript:;'>link
                                        settings</a>
                                        <i className="tio-help-outlined" data-toggle="tooltip" data-placement="top"
                                           title="The public share link allows people to view the project without giving access to full collaboration features."/>
                                    </p>
                                </div>
                                <div className="col-sm-3 text-sm-right">
                                    <a className="js-clipboard btn btn-sm btn-white text-nowrap" href='javascript:;'
                                       data-toggle="tooltip" data-placement="top" title="Copy to clipboard!"
                                       data-hs-clipboard-options="{
              &quot;type&quot;: &quot;tooltip&quot;,
              &quot;successText&quot;: &quot;Copied!&quot;,
              &quot;contentTarget&quot;: &quot;#inviteUserPublicClipboard&quot;,
              &quot;container&quot;: &quot;#inviteUserModal&quot;
             }">
                                        <i className="tio-link mr-1"/> Copy link</a>
                                </div>
                            </div>
                        </div>
                        {/* End Footer */}
                    </form>
                </div>
            </div>
            {/* End Create a new user CustomModal */}
            {/* ========== END SECONDARY CONTENTS ========== */}
        </div>
    );
};

export default Index;
