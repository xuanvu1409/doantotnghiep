import React, {useEffect} from 'react';
import $ from "jquery";
import ScrollspyNav from "react-scrollspy-nav";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Index = () => {
    const {currentMember} = useSelector(state => state.member);

    useEffect(() => {
        $('.js-sticky-block').each(function () {
            new window.HSStickyBlock($(this), {
                targetSelector: $('#header').hasClass('navbar-fixed') ? '#header' : null
            }).init();
        });
    }, [])

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <div className="row align-items-end">
                    <div className="col-sm mb-2 mb-sm-0">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb breadcrumb-no-gutter">
                                <li className="breadcrumb-item"><a className="breadcrumb-link" href="javascript:;">Pages</a></li>
                                <li className="breadcrumb-item"><a className="breadcrumb-link" href="javascript:;">Account</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Settings</li>
                            </ol>
                        </nav>
                        <h1 className="page-header-title">Settings</h1>
                    </div>
                    <div className="col-sm-auto">
                        <Link className="btn btn-primary" to={"/profile/"+ currentMember.profileId}>
                            <i className="tio-user mr-1" /> My profile
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
                        <button type="button" className="navbar-toggler btn btn-block btn-white mb-3" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbarVerticalNavMenu" data-toggle="collapse" data-target="#navbarVerticalNavMenu">
          <span className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">Nav menu</span>
            <span className="navbar-toggle-default">
              <i className="tio-menu-hamburger" />
            </span>
            <span className="navbar-toggle-toggled">
              <i className="tio-clear" />
            </span>
          </span>
                        </button>
                        {/* End Navbar Toggle */}
                        <div id="navbarVerticalNavMenu" className="collapse navbar-collapse">
                            {/* Navbar Nav */}
                            <ScrollspyNav
                                scrollTargetIds={["basic", "emailSection", "passwordSection", "preferencesSection", "twoStepVerificationSection", "recentDevicesSection", "recentDevicesSection", "notificationsSection", "connectedAccountsSection", "socialAccountsSection", "deleteAccountSection"]}
                                activeNavClass="active" offset={138}
                            >
                            <ul id="navbarSettings" className="js-sticky-block js-scrollspy navbar-nav navbar-nav-lg nav-tabs card card-navbar-nav" data-hs-sticky-block-options="{
                 &quot;parentSelector&quot;: &quot;#navbarVerticalNavMenu&quot;,
                 &quot;breakpoint&quot;: &quot;lg&quot;,
                 &quot;startPoint&quot;: &quot;#navbarVerticalNavMenu&quot;,
                 &quot;endPoint&quot;: &quot;#stickyBlockEndPoint&quot;,
                 &quot;stickyOffsetTop&quot;: 20
               }">
                                <li className="nav-item">
                                    <a className="nav-link" href="#basic">
                                        <i className="tio-user-outlined nav-icon" /> Basic information
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#emailSection">
                                        <i className="tio-online nav-icon" /> Email
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#passwordSection">
                                        <i className="tio-lock-outlined nav-icon" /> Password
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#preferencesSection">
                                        <i className="tio-settings-outlined nav-icon" /> Preferences
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#twoStepVerificationSection">
                                        <i className="tio-fingerprint nav-icon" /> Two-step verification
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#recentDevicesSection">
                                        <i className="tio-devices-apple nav-icon" /> Recent devices
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#notificationsSection">
                                        <i className="tio-notifications-on-outlined nav-icon" /> Notifications
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#connectedAccountsSection">
                                        <i className="tio-node-multiple-outlined nav-icon" /> Connected accounts
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#socialAccountsSection">
                                        <i className="tio-instagram nav-icon" /> Social accounts
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#deleteAccountSection">
                                        <i className="tio-delete-outlined nav-icon" /> Delete account
                                    </a>
                                </li>
                            </ul>

                            </ScrollspyNav>
                            {/* End Navbar Nav */}
                        </div>
                    </div>
                    {/* End Navbar */}
                </div>
                <div className="col-lg-9">
                    {/* Card */}
                    <div className="card mb-3 mb-lg-5">
                        {/* Profile Cover */}
                        <div className="profile-cover">
                            <div className="profile-cover-img-wrapper">
                                <img id="profileCoverImg" className="profile-cover-img" src="assets\img\1920x400\img2.jpg" alt="Image Description" />
                                {/* Custom File Cover */}
                                <div className="profile-cover-content profile-cover-btn">
                                    <div className="custom-file-btn">
                                        <input type="file" className="js-file-attach custom-file-btn-input" id="profileCoverUplaoder" data-hs-file-attach-options="{
                          &quot;textTarget&quot;: &quot;#profileCoverImg&quot;,
                          &quot;mode&quot;: &quot;image&quot;,
                          &quot;targetAttr&quot;: &quot;src&quot;,
                          &quot;allowTypes&quot;: [&quot;.png&quot;, &quot;.jpeg&quot;, &quot;.jpg&quot;]
                       }" />
                                        <label className="custom-file-btn-label btn btn-sm btn-white" htmlFor="profileCoverUplaoder">
                                            <i className="tio-add-photo mr-sm-1" />
                                            <span className="d-none d-sm-inline-block">Update your header</span>
                                        </label>
                                    </div>
                                </div>
                                {/* End Custom File Cover */}
                            </div>
                        </div>
                        {/* End Profile Cover */}
                        {/* Avatar */}
                        <label className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar" htmlFor="avatarUploader">
                            <img id="avatarImg" className="avatar-img" src="assets\img\160x160\img6.jpg" alt="Image Description" />
                            <input type="file" className="js-file-attach avatar-uploader-input" id="avatarUploader" data-hs-file-attach-options="{
                    &quot;textTarget&quot;: &quot;#avatarImg&quot;,
                    &quot;mode&quot;: &quot;image&quot;,
                    &quot;targetAttr&quot;: &quot;src&quot;,
                    &quot;allowTypes&quot;: [&quot;.png&quot;, &quot;.jpeg&quot;, &quot;.jpg&quot;]
                 }" />
                            <span className="avatar-uploader-trigger">
            <i className="tio-edit avatar-uploader-icon shadow-soft" />
          </span>
                        </label>
                        {/* End Avatar */}
                        {/* Body */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-5">
                                    <span className="d-block font-size-sm mb-2">Who can see your profile photo? <i className="tio-help-outlined" data-toggle="tooltip" data-placement="top" title="Your visibility setting only applies to your profile photo. Your header image is always visible to anyone." /></span>
                                    {/* Select */}
                                    <div className="select2-custom">
                                        <select className="js-select2-custom custom-select" size={1} style={{opacity: 0}} data-hs-select2-options="{
                          &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;
                        }">
                                            <option value="privacy1" data-option-template="<span class=&quot;media&quot;><i class=&quot;tio-earth-east tio-lg text-body mr-2&quot; style=&quot;margin-top: .125rem;&quot;></i><span class=&quot;media-body&quot;><span class=&quot;d-block&quot;>Anyone</span><small class=&quot;select2-custom-hide&quot;>Visible to anyone who can view your content. Accessible by installed apps.</small></span></span>">Anyone</option>
                                            <option value="privacy2" data-option-template="<span class=&quot;media&quot;><i class=&quot;tio-lock-outlined tio-lg text-body mr-2&quot; style=&quot;margin-top: .125rem;&quot;></i><span class=&quot;media-body&quot;><span class=&quot;d-block&quot;>Only you</span><small class=&quot;select2-custom-hide&quot;>Only visible to you.</small></span></span>">Only you</option>
                                        </select>
                                    </div>
                                    {/* End Select */}
                                </div>
                            </div>
                            {/* End Row */}
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="basic" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h2 className="card-title h4">Basic information</h2>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            {/* Form */}
                            <form>
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="firstNameLabel" className="col-sm-3 col-form-label input-label">Full name <i className="tio-help-outlined text-body ml-1" data-toggle="tooltip" data-placement="top" title="Displayed on public forums, such as Front." /></label>
                                    <div className="col-sm-9">
                                        <div className="input-group input-group-sm-down-break">
                                            <input type="text" className="form-control" name="firstName" id="firstNameLabel" placeholder="Your first name" aria-label="Your first name" defaultValue="Mark" />
                                            <input type="text" className="form-control" name="lastName" id="lastNameLabel" placeholder="Your last name" aria-label="Your last name" defaultValue="Williams" />
                                        </div>
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="emailLabel" className="col-sm-3 col-form-label input-label">Email</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" name="email" id="emailLabel" placeholder="Email" aria-label="Email" defaultValue="mark@example.com" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="phoneLabel" className="col-sm-3 col-form-label input-label">Phone <span className="input-label-secondary">(Optional)</span></label>
                                    <div className="col-sm-9">
                                        <input type="text" className="js-masked-input form-control" name="phone" id="phoneLabel" placeholder="+x(xxx)xxx-xx-xx" aria-label="+x(xxx)xxx-xx-xx" defaultValue="+1 (609) 972-22-22" data-hs-mask-options="{
                         &quot;template&quot;: &quot;+0(000)000-00-00&quot;
                       }" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="organizationLabel" className="col-sm-3 col-form-label input-label">Organization</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="organization" id="organizationLabel" placeholder="Your organization" aria-label="Your organization" defaultValue="Htmlstream" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="departmentLabel" className="col-sm-3 col-form-label input-label">Department</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="department" id="departmentLabel" placeholder="Your department" aria-label="Your department" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div id="accountType" className="row form-group">
                                    <label className="col-sm-3 col-form-label input-label">Account type</label>
                                    <div className="col-sm-9">
                                        <div className="input-group input-group-sm-down-break">
                                            {/* Custom Radio */}
                                            <div className="form-control">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" name="userAccountTypeRadio" id="userAccountTypeRadio1" defaultChecked />
                                                    <label className="custom-control-label" htmlFor="userAccountTypeRadio1">Individual</label>
                                                </div>
                                            </div>
                                            {/* End Custom Radio */}
                                            {/* Custom Radio */}
                                            <div className="form-control">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" name="userAccountTypeRadio" id="userAccountTypeRadio2" />
                                                    <label className="custom-control-label" htmlFor="userAccountTypeRadio2">Company</label>
                                                </div>
                                            </div>
                                            {/* End Custom Radio */}
                                        </div>
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="locationLabel" className="col-sm-3 col-form-label input-label">Location</label>
                                    <div className="col-sm-9">
                                        {/* Select */}
                                        <div className="mb-3">
                                            <select id="locationLabel" data-hs-select2-options="{
                            &quot;searchInputPlaceholder&quot;: &quot;Search a country&quot;
                          }">
                                                <option value />
                                            </select>
                                        </div>
                                        {/* End Select */}
                                        <div className="mb-3">
                                            <input type="text" className="form-control" name="city" id="cityLabel" placeholder="City" aria-label="City" defaultValue="London" />
                                        </div>
                                        <input type="text" className="form-control" name="state" id="stateLabel" placeholder="State" aria-label="State" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="addressLine1Label" className="col-sm-3 col-form-label input-label">Address line 1</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="addressLine1" id="addressLine1Label" placeholder="Your address" aria-label="Your address" defaultValue="45 Roker Terrace, Latheronwheel" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="addressLine2Label" className="col-sm-3 col-form-label input-label">Address line 2 <span className="input-label-secondary">(Optional)</span></label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="addressLine2" id="addressLine2Label" placeholder="Your address" aria-label="Your address" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="zipCodeLabel" className="col-sm-3 col-form-label input-label">Zip code <i className="tio-help-outlined text-body ml-1" data-toggle="tooltip" data-placement="top" title="You can find your code in a postal address." /></label>
                                    <div className="col-sm-9">
                                        <input type="text" className="js-masked-input form-control" name="zipCode" id="zipCodeLabel" placeholder="Your zip code" aria-label="Your zip code" defaultValue="KW5 8NW" data-hs-mask-options="{
                         &quot;template&quot;: &quot;AA0 0AA&quot;
                       }" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row align-items-center form-group">
                                    <label htmlFor="disableAdCheckbox" className="col-sm-3 col-form-label input-label">Disable ads <span className="badge badge-primary text-uppercase ml-1">PRO</span></label>
                                    <div className="col-sm-9">
                                        {/* Custom Checkbox */}
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="disableAdCheckbox" />
                                            <label className="custom-control-label" htmlFor="disableAdCheckbox">With your Pro account, you can disable ads across the site.</label>
                                        </div>
                                        {/* End Custom Checkbox */}
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
                    <div id="emailSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h3 className="card-title h4">Email</h3>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <p>Your current email address is <span className="font-weight-bold">mark@example.com</span></p>
                            {/* Form */}
                            <form>
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="newEmailLabel" className="col-sm-3 col-form-label input-label">New email address</label>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control" name="newEmail" id="newEmailLabel" placeholder="Enter new email address" aria-label="Enter new email address" />
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
                        <div className="card-header">
                            <h4 className="card-title">Change your password</h4>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            {/* Form */}
                            <form id="changePasswordForm">
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="currentPasswordLabel" className="col-sm-3 col-form-label input-label">Current password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" name="currentPassword" id="currentPasswordLabel" placeholder="Enter current password" aria-label="Enter current password" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="newPassword" className="col-sm-3 col-form-label input-label">New password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="js-pwstrength form-control" name="newPassword" id="newPassword" placeholder="Enter new password" aria-label="Enter new password" data-hs-pwstrength-options="{
                         &quot;ui&quot;: {
                           &quot;container&quot;: &quot;#changePasswordForm&quot;,
                           &quot;viewports&quot;: {
                             &quot;progress&quot;: &quot;#passwordStrengthProgress&quot;,
                             &quot;verdict&quot;: &quot;#passwordStrengthVerdict&quot;
                           }
                         }
                       }" />
                                        <p id="passwordStrengthVerdict" className="form-text mb-2">
                                        </p><div id="passwordStrengthProgress" />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="confirmNewPasswordLabel" className="col-sm-3 col-form-label input-label">Confirm new password</label>
                                    <div className="col-sm-9">
                                        <div className="mb-3">
                                            <input type="password" className="form-control" name="confirmNewPassword" id="confirmNewPasswordLabel" placeholder="Confirm your new password" aria-label="Confirm your new password" />
                                        </div>
                                        <h5>Password requirements:</h5>
                                        <p className="font-size-sm mb-2">Ensure that these requirements are met:</p>
                                        <ul className="font-size-sm">
                                            <li>Minimum 8 characters long - the more, the better</li>
                                            <li>At least one lowercase character</li>
                                            <li>At least one uppercase character</li>
                                            <li>At least one number, symbol, or whitespace character</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* End Form Group */}
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="preferencesSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h4 className="card-title">Preferences</h4>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            {/* Form */}
                            <form>
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="languageLabel" className="col-sm-3 col-form-label input-label">Language</label>
                                    <div className="col-sm-9">
                                        {/* Select */}
                                        <select className="js-select2-custom custom-select" size={1} style={{opacity: 0}} id="languageLabel" data-hs-select2-options="{
                          &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                          &quot;placeholder&quot;: &quot;Select language&quot;
                        }">
                                            <option label="empty" />
                                            <option value="language1" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/us.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>English (US)</span></span>">English (US)</option>
                                            <option value="language2" selected data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/gb.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>English (UK)</span></span>">English (UK)</option>
                                            <option value="language3" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/de.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>Deutsch</span></span>">Deutsch</option>
                                            <option value="language4" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/dk.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>Dansk</span></span>">Dansk</option>
                                            <option value="language5" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/es.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>Español</span></span>">Español</option>
                                            <option value="language6" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/nl.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>Nederlands</span></span>">Nederlands</option>
                                            <option value="language7" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/it.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>Italiano</span></span>">Italiano</option>
                                            <option value="language8" data-option-template="<span class=&quot;d-flex align-items-center&quot;><img class=&quot;avatar avatar-xss avatar-circle mr-2&quot; src=&quot;./assets/vendor/flag-icon-css/flags/1x1/cn.svg&quot; alt=&quot;Image description&quot; width=&quot;16&quot;/><span>中文 (繁體)</span></span>">中文 (繁體)</option>
                                        </select>
                                        {/* End Select */}
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="timeZoneLabel" className="col-sm-3 col-form-label input-label">Time zone</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" name="currentPassword" id="timeZoneLabel" placeholder="Your time zone" aria-label="Your time zone" defaultValue="GMT+01:00" readOnly />
                                    </div>
                                </div>
                                {/* End Form Group */}
                                {/* Toggle Switch */}
                                <label className="row form-group toggle-switch" htmlFor="preferencesSwitch1">
              <span className="col-8 col-sm-9 toggle-switch-content ml-0">
                <span className="d-block text-dark">Early release</span>
                <span className="d-block font-size-sm">Get included on early releases for new Front features.</span>
              </span>
                                    <span className="col-4 col-sm-3">
                <input type="checkbox" className="toggle-switch-input" id="preferencesSwitch1" />
                <span className="toggle-switch-label ml-auto">
                  <span className="toggle-switch-indicator" />
                </span>
              </span>
                                </label>
                                {/* End Toggle Switch */}
                                {/* Toggle Switch */}
                                <label className="row form-group toggle-switch" htmlFor="preferencesSwitch2">
              <span className="col-8 col-sm-9 toggle-switch-content ml-0">
                <span className="d-block text-dark">See info about people who view my profile</span>
                <span className="d-block font-size-sm"><a className="link" href="#">More about viewer info</a>.</span>
              </span>
                                    <span className="col-4 col-sm-3">
                <input type="checkbox" className="toggle-switch-input" id="preferencesSwitch2" defaultChecked />
                <span className="toggle-switch-label ml-auto">
                  <span className="toggle-switch-indicator" />
                </span>
              </span>
                                </label>
                                {/* End Toggle Switch */}
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="twoStepVerificationSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <div className="d-flex align-items-center">
                                <h4 className="card-title">Two-step verification</h4>
                                <span className="badge badge-soft-danger ml-2">Disabled</span>
                            </div>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <p className="card-text">Start by entering your password so that we know it's you. Then we'll walk you through two more simple steps.</p>
                            <form>
                                {/* Form Group */}
                                <div className="row form-group">
                                    <label htmlFor="accountPasswordLabel" className="col-sm-3 col-form-label input-label">Account password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className="form-control" name="currentPassword" id="accountPasswordLabel" placeholder="Enter current password" aria-label="Enter current password" />
                                        <small className="form-text">This is the password you use to log in to your Front account.</small>
                                    </div>
                                </div>
                                {/* End Form Group */}
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Set up</button>
                                </div>
                            </form>
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="recentDevicesSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h4 className="card-title">Recent devices</h4>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <p className="card-text">View and manage devices where you're currently logged in.</p>
                        </div>
                        {/* End Body */}
                        {/* Table */}
                        <div className="table-responsive">
                            <table className="table table-thead-bordered table-nowrap table-align-middle card-table">
                                <thead className="thead-light">
                                <tr>
                                    <th>Browser</th>
                                    <th>Device</th>
                                    <th>Location</th>
                                    <th>Most recent activity</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <img className="avatar avatar-xss mr-2" src="assets\svg\brands\chrome.svg" alt="Image Description" /> Chrome on Windows
                                    </td>
                                    <td><i className="tio-laptop tio-lg mr-2" /> Dell XPS 15 <span className="badge badge-soft-success ml-1">Current</span></td>
                                    <td>London, UK</td>
                                    <td>Now</td>
                                </tr>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <img className="avatar avatar-xss mr-2" src="assets\svg\brands\chrome.svg" alt="Image Description" /> Chrome on Android
                                    </td>
                                    <td><i className="tio-android-phone-vs tio-lg mr-2" /> Google Pixel 3a</td>
                                    <td>London, UK</td>
                                    <td>15, August 2020 15:08</td>
                                </tr>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <img className="avatar avatar-xss mr-2" src="assets\svg\brands\chrome.svg" alt="Image Description" /> Chrome on Windows
                                    </td>
                                    <td><i className="tio-imac tio-lg mr-2" /> Microsoft Studio 2</td>
                                    <td>London, UK</td>
                                    <td>12, August 2020 20:07</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* End Table */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="notificationsSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h4 className="card-title">Notifications</h4>
                        </div>
                        {/* Alert */}
                        <div className="alert alert-soft-dark card-alert text-center" role="alert">
                            We need permission from your browser to show notifications. <a className="alert-link" href="#">Request permission</a>
                        </div>
                        {/* End Alert */}
                        <form>
                            {/* Table */}
                            <div className="table-responsive">
                                <table className="table table-thead-bordered table-nowrap table-align-middle card-table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Type</th>
                                        <th className="text-center">
                                            <div className="mb-1">
                                                <img className="avatar avatar-xs" src="assets\svg\illustrations\at-line.svg" alt="Image Description" />
                                            </div>
                                            Email
                                        </th>
                                        <th className="text-center">
                                            <div className="mb-1">
                                                <img className="avatar avatar-xs" src="assets\svg\illustrations\world-line.svg" alt="Image Description" />
                                            </div>
                                            Browser
                                        </th>
                                        <th className="text-center">
                                            <div className="mb-1">
                                                <img className="avatar avatar-xs" src="assets\svg\illustrations\phone-line.svg" alt="Image Description" />
                                            </div>
                                            App
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>New for you</td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox1" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox1" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox2" />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox2" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox3" />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox3" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Account activity <i className="tio-help-outlined text-body ml-1" data-toggle="tooltip" data-placement="top" title="Get important notifications about you or activity you've missed" /></td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox4" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox4" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox5" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox5" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox6" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox6" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>A new browser used to sign in</td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox7" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox7" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox8" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox8" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox9" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox9" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>A new device is linked</td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox10" />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox10" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox11" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox11" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox12" />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox12" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>A new device connected <i className="tio-help-outlined text-body ml-1" data-toggle="tooltip" data-placement="top" title="Email me when a new device connected" /></td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox13" />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox13" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox14" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox14" />
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="alertsCheckbox15" defaultChecked />
                                                <label className="custom-control-label" htmlFor="alertsCheckbox15" />
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* End Table */}
                        </form>
                        <hr />
                        {/* Body */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm">
                                    {/* Form Group */}
                                    <div className="form-group">
                                        <p className="card-text">When should we send you notifications?</p>
                                        {/* Select */}
                                        <select className="js-select2-custom custom-select" size={1} style={{opacity: 0}} data-hs-select2-options="{
                          &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;
                        }">
                                            <option value="whenToSendNotification1">Always</option>
                                            <option value="whenToSendNotification2">Only when I'm online</option>
                                        </select>
                                        {/* End Select */}
                                    </div>
                                    {/* End Form Group */}
                                </div>
                                <div className="col-sm">
                                    {/* Form Group */}
                                    <div className="form-group">
                                        <p className="card-text">Send me a daily summary ("Daily Digest") of task activity.</p>
                                        <div className="form-row">
                                            <div className="col-auto mb-2">
                                                {/* Select */}
                                                <select className="js-select2-custom custom-select" size={1} style={{opacity: 0}} data-hs-select2-options="{
                              &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                              &quot;dropdownAutoWidth&quot;: true,
                              &quot;width&quot;: true
                            }">
                                                    <option value="everyday">Everyday</option>
                                                    <option value="weekdays" selected>Weekdays</option>
                                                    <option value="never">Never</option>
                                                </select>
                                                {/* End Select */}
                                            </div>
                                            <div className="col-auto mb-2">
                                                {/* Select */}
                                                <select className="js-select2-custom custom-select" size={1} style={{opacity: 0}} data-hs-select2-options="{
                              &quot;minimumResultsForSearch&quot;: &quot;Infinity&quot;,
                              &quot;dropdownAutoWidth&quot;: true,
                              &quot;width&quot;: true
                            }">
                                                    <option value={0}>at 12 AM</option>
                                                    <option value={1}>at 1 AM</option>
                                                    <option value={2}>at 2 AM</option>
                                                    <option value={3}>at 3 AM</option>
                                                    <option value={4}>at 4 AM</option>
                                                    <option value={5}>at 5 AM</option>
                                                    <option value={6}>at 6 AM</option>
                                                    <option value={7}>at 7 AM</option>
                                                    <option value={8}>at 8 AM</option>
                                                    <option value={9} selected>at 9 AM</option>
                                                    <option value={10}>at 10 AM</option>
                                                    <option value={11}>at 11 AM</option>
                                                    <option value={12}>at 12 PM</option>
                                                    <option value={13}>at 1 PM</option>
                                                    <option value={14}>at 2 PM</option>
                                                    <option value={15}>at 3 PM</option>
                                                    <option value={16}>at 4 PM</option>
                                                    <option value={17}>at 5 PM</option>
                                                    <option value={18}>at 6 PM</option>
                                                    <option value={19}>at 7 PM</option>
                                                    <option value={20}>at 8 PM</option>
                                                    <option value={21}>at 9 PM</option>
                                                    <option value={22}>at 10 PM</option>
                                                    <option value={23}>at 11 PM</option>
                                                </select>
                                                {/* End Select */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Form Group */}
                                </div>
                            </div>
                            <p className="card-text">In order to cut back on noise, email notifications are grouped together and only sent when you're idle or offline.</p>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="connectedAccountsSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h4 className="card-title">Connected accounts</h4>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <p className="card-text">Integrated features from these accounts make it easier to collaborate with people you know on Front Dashboard.</p>
                            {/* Form */}
                            <form>
                                <div className="list-group list-group-lg list-group-flush list-group-no-gutters">
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <img className="avatar avatar-xs mt-1 mr-3" src="assets\svg\brands\google.svg" alt="Image Description" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <h5 className="mb-0">Google</h5>
                                                        <p className="font-size-sm mb-0">Calendar and contacts</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Checkbox Switch */}
                                                        <label className="toggle-switch" htmlFor="connectedAccounts1">
                                                            <input id="connectedAccounts1" type="checkbox" className="toggle-switch-input" />
                                                            <span className="toggle-switch-label">
                            <span className="toggle-switch-indicator" />
                          </span>
                                                        </label>
                                                        {/* End Checkbox Switch */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <img className="avatar avatar-xs mt-1 mr-3" src="assets\svg\brands\spec.svg" alt="Image Description" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <h5 className="mb-0">Spec</h5>
                                                        <p className="font-size-sm mb-0">Project management</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Checkbox Switch */}
                                                        <label className="toggle-switch" htmlFor="connectedAccounts2">
                                                            <input id="connectedAccounts2" type="checkbox" className="toggle-switch-input" />
                                                            <span className="toggle-switch-label">
                            <span className="toggle-switch-indicator" />
                          </span>
                                                        </label>
                                                        {/* End Checkbox Switch */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <img className="avatar avatar-xs mt-1 mr-3" src="assets\svg\brands\slack.svg" alt="Image Description" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <h5 className="mb-0">Slack</h5>
                                                        <p className="font-size-sm mb-0">Communication <a className="link" href="#">Learn more</a></p>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Checkbox Switch */}
                                                        <label className="toggle-switch" htmlFor="connectedAccounts3">
                                                            <input id="connectedAccounts3" type="checkbox" className="toggle-switch-input" defaultChecked />
                                                            <span className="toggle-switch-label">
                            <span className="toggle-switch-indicator" />
                          </span>
                                                        </label>
                                                        {/* End Checkbox Switch */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <img className="avatar avatar-xs mt-1 mr-3" src="assets\svg\brands\mailchimp.svg" alt="Image Description" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <h5 className="mb-0">Mailchimp</h5>
                                                        <p className="font-size-sm mb-0">Email marketing service</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Checkbox Switch */}
                                                        <label className="toggle-switch" htmlFor="connectedAccounts4">
                                                            <input id="connectedAccounts4" type="checkbox" className="toggle-switch-input" defaultChecked />
                                                            <span className="toggle-switch-label">
                            <span className="toggle-switch-indicator" />
                          </span>
                                                        </label>
                                                        {/* End Checkbox Switch */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <img className="avatar avatar-xs mt-1 mr-3" src="assets\svg\brands\google-webdev.svg" alt="Image Description" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <h5 className="mb-0">Google Webdev</h5>
                                                        <p className="font-size-sm mb-0">Tools for Web Developers <a className="link" href="#">Learn more</a></p>
                                                    </div>
                                                    <div className="col-auto">
                                                        {/* Checkbox Switch */}
                                                        <label className="toggle-switch" htmlFor="connectedAccounts5">
                                                            <input id="connectedAccounts5" type="checkbox" className="toggle-switch-input" />
                                                            <span className="toggle-switch-label">
                            <span className="toggle-switch-indicator" />
                          </span>
                                                        </label>
                                                        {/* End Checkbox Switch */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                </div>
                            </form>
                            {/* End Form */}
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="socialAccountsSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h4 className="card-title">Social accounts</h4>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <form>
                                <div className="list-group list-group-lg list-group-flush list-group-no-gutters">
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <i className="tio-twitter list-group-icon mt-1" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col-sm mb-2 mb-sm-0">
                                                        <h5 className="mb-0">Twitter</h5>
                                                        <a className="font-size-sm" href="#">www.twitter.com/htmlstream</a>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <a className="btn btn-sm btn-white" href="javascript:;">Disconnect</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <i className="tio-facebook list-group-icon mt-1" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col-sm mb-2 mb-sm-0">
                                                        <h5 className="mb-0">Facebook</h5>
                                                        <a className="font-size-sm" href="#">www.facebook.com/htmlstream</a>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <a className="btn btn-sm btn-white" href="javascript:;">Disconnect</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <i className="tio-dribbble list-group-icon mt-1" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col-sm mb-2 mb-sm-0">
                                                        <h5 className="mb-0">Dribbble</h5>
                                                        <p className="font-size-sm mb-0">Not connected</p>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <a className="btn btn-sm btn-white" href="javascript:;">Connect</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <i className="tio-linkedin list-group-icon mt-1" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col-sm mb-2 mb-sm-0">
                                                        <h5 className="mb-0">Linkedin</h5>
                                                        <a className="font-size-sm" href="#">www.linkedin.com/htmlstream</a>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <a className="btn btn-sm btn-white" href="javascript:;">Disconnect</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                    {/* List Item */}
                                    <div className="list-group-item">
                                        <div className="media">
                                            <i className="tio-behance list-group-icon mt-1" />
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col-sm mb-2 mb-sm-0">
                                                        <h5 className="mb-0">Behance</h5>
                                                        <p className="font-size-sm mb-0">Not connected</p>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <a className="btn btn-sm btn-white" href="javascript:;">Connect</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End List Item */}
                                </div>
                            </form>
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Card */}
                    <div id="deleteAccountSection" className="card mb-3 mb-lg-5">
                        <div className="card-header">
                            <h4 className="card-title">Delete your account</h4>
                        </div>
                        {/* Body */}
                        <div className="card-body">
                            <p className="card-text">When you delete your account, you lose access to Front account services, and we permanently delete your personal data. You can cancel the deletion for 14 days.</p>
                            <div className="form-group">
                                {/* Custom Checkbox */}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="deleteAccountCheckbox" />
                                    <label className="custom-control-label" htmlFor="deleteAccountCheckbox">Confirm that I want to delete my account.</label>
                                </div>
                                {/* End Custom Checkbox */}
                            </div>
                            <div className="d-flex justify-content-end">
                                <a className="btn btn-white mr-2" href="#">Learn more <i className="tio-open-in-new ml-1" /></a>
                                <button type="submit" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                        {/* End Body */}
                    </div>
                    {/* End Card */}
                    {/* Sticky Block End Point */}
                    <div id="stickyBlockEndPoint" />
                </div>
            </div>
            {/* End Row */}
        </div>

    );
};

export default Index;
