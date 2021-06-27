import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import moment from "moment";
import 'moment-timezone';
import {titleCase} from "../../../../../utils/helper";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import useToggle from '../../../../../hooks/useToggle';

const Chats = (props) => {
    const {messages, me, toMember, sendMessage} = props;
    const {handleSubmit, register, reset, append} = useForm();
    const [emoji, setEmoji] = useToggle(false);

    const addEmoji = (e) => {
        if (e.native) {
            document.getElementById('chat-input').value += e.native;
        }
    }

    const renderMessage = () => {
        return (
            messages?.map(e => (
                <div className={'message' + (e.from?._id === me ? ' message-right' : '')} key={e._id}>
                    {/* Avatar */}
                    {
                        e.from?._id !== me
                        &&
                        <span className="avatar avatar-circle avatar-sm mr-2 mr-lg-3" href="#"
                              style={{flex: 'none'}}>
                            <img className="avatar-img" src={e.from.avatar?.srcImage} alt=""/>
                        </span>
                    }
                    {/* Message: body */}
                    <div className="message-body">
                        {/* Message: row */}
                        <div className="message-row">
                            <div
                                className={'d-flex align-items-center' + (e.from?._id === me ? ' justify-content-end' : '')}>
                                {
                                    e.from?._id !== me
                                        ?
                                        <>
                                            {/* Message: content */}
                                            <div className="message-content bg-light">
                                                <div>{e.content}
                                                </div>
                                                <div className="mt-1">
                                                    <small className="opacity-65">
                                                        {
                                                            moment(new Date()).diff(e.updateAt, 'days') >= 1
                                                                ?
                                                                moment.tz(e.updateAt, 'Asia/Ho_Chi_Minh').format('D-M')
                                                                :
                                                                moment.tz(e.updateAt, 'Asia/Ho_Chi_Minh').format('h:m')
                                                        }
                                                    </small>
                                                </div>
                                            </div>
                                            {/* Message: content */}
                                            {/* Message: dropdown */}
                                            <div className="dropdown">
                                                <a className={'text-muted opacity-60' + (e.from?._id === me ? ' mr-2' : ' ml-2')}
                                                   href="#"
                                                   data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <i className="tio-more-vertical"/>
                                                </a>
                                            </div>
                                            {/* Message: dropdown */}
                                        </>
                                        :
                                        <>
                                            {/* Message: dropdown */}
                                            <div className="dropdown">
                                                <a className={'text-muted opacity-60' + (e.from?._id === me ? ' mr-2' : ' ml-2')}
                                                   href="#"
                                                   data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <i className="tio-more-vertical"/>
                                                </a>
                                            </div>
                                            {/* Message: dropdown */}
                                            {/* Message: content */}
                                            <div className="message-content bg-primary text-white">
                                                <div>{e.content}
                                                </div>
                                                <div className="mt-1">
                                                    <small className="opacity-65">
                                                        {
                                                            moment(new Date()).diff(e.updateAt, 'days') >= 1
                                                                ?
                                                                moment.tz(e.updateAt, 'Asia/Ho_Chi_Minh').format('D-M')
                                                                :
                                                                moment.tz(e.updateAt, 'Asia/Ho_Chi_Minh').format('h:m')
                                                        }
                                                    </small>
                                                </div>
                                            </div>
                                            {/* Message: content */}
                                        </>
                                }
                            </div>
                        </div>
                        {/* Message: row */}
                    </div>
                    {/* Message: Body */}
                </div>
            ))
        )
    }

    const onSubmit = (data) => {
        sendMessage(data);
        reset();
    }

    return (
        <div className="main-mess main-visible">
            {/* Chat */}
            <div id="chat-2" className="chat dropzone-form-js" data-dz-url="some.html">
                {/* Chat: body */}
                <div className="chat-body">
                    {/* Chat: Header */}
                    <div className="chat-header border-bottom py-2 py-lg-4 px-lg-6">
                        <div className="container-xl">
                            <div className="row align-items-center">
                                {/* Close chat(mobile) */}
                                <div className="col-3 d-xl-none">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                            <a className="text-muted px-0" href="#" data-chat="open">
                                                <i className="icon-md fe-chevron-left"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Chat photo */}
                                <div className="col-6 col-xl-6">
                                    <div className="media text-center text-xl-left">
                                        <div className="avatar mb-2 avatar-circle mr-3">
                                            <img className="avatar-img" src={toMember?.avatar?.srcImage}
                                                 alt="Image Description"/>
                                            <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                        </div>
                                        <div className="media-body align-self-center text-truncate">
                                            <h4 className="text-truncate mb-n1">{titleCase(toMember?.name)}</h4>
                                            <span
                                                className="badge badge-dot badge-success d-inline-block d-xl-none mr-1"/>
                                            <small className="text-muted">Online</small>
                                        </div>
                                    </div>
                                </div>
                                {/* Chat toolbar */}
                                <div className="col-3 col-xl-6 text-right">
                                    <ul className="nav justify-content-end">
                                        <li className="nav-item list-inline-item d-none d-xl-block mr-3">
                                            <a className="nav-link text-muted px-3" data-toggle="collapse"
                                               data-target="#chat-2-search" href="#" title="Search this chat">
                                                <i className="tio-search"/>
                                            </a>
                                        </li>
                                        <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                                            <a className="nav-link text-muted px-3" href="#"
                                               data-chat-sidebar-toggle="#chat-2-info" title="Details">
                                                <i className="tio-more-vertical"/>
                                            </a>
                                        </li>
                                        {/* Mobile nav */}
                                        <li className="nav-item list-inline-item d-block d-xl-none">
                                            <div className="dropdown">
                                                <a className="nav-link text-muted px-0" href="#"
                                                   data-toggle="dropdown" aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <i className="icon-md fe-more-vertical"/>
                                                </a>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item d-flex align-items-center"
                                                       data-toggle="collapse" data-target="#chat-2-search" href="#">
                                                        Search <span className="ml-auto pl-5 fe-search"/>
                                                    </a>
                                                    <a className="dropdown-item d-flex align-items-center" href="#"
                                                       data-chat-sidebar-toggle="#chat-2-info">
                                                        Chat Info <span
                                                        className="ml-auto pl-5 fe-more-horizontal"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Mobile nav */}
                                    </ul>
                                </div>
                            </div>
                            {/* .row */}
                        </div>
                    </div>
                    {/* Chat: Header */}
                    {/* Chat: Search */}
                    <div className="collapse border-bottom px-lg-8" id="chat-2-search">
                        <div className="container-xxl py-4 py-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Search this chat" aria-label="Search this chat"/>
                                <div className="input-group-append">
                                    <button className="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                                        <i className="fe-search"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Chat: Search */}
                    {/* Chat: Content*/}
                    <div className="chat-content px-lg-6">
                        <div className="container-xl py-4 py-lg-6">
                            {renderMessage()}
                        </div>
                        <div id="end-of-chat"/>
                        {/* Scroll to end */}
                    </div>
                    {/* Chat: Content */}
                    {/* Chat: DropzoneJS container */}
                    {/*<div className="chat-files hide-scrollbar px-lg-8">*/}
                    {/*    <div className="container-xl">*/}
                    {/*        <div className="dropzone-previews-js form-row py-4" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/* Chat: DropzoneJS container */}
                    {/* Chat: Footer */}
                    <div className="chat-footer border-top py-3 py-lg-4 px-lg-6">
                        <form id="chat-id-2-form"
                              onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row align-items-center">
                                <div className="col">
                                    <div className="input-group">
                                        {/* Textarea */}
                                        <textarea id="chat-input" {...register('content', {required: true})}
                                                  className="form-control bg-transparent border-0"
                                                  placeholder="Aa" rows={1} data-emoji-input
                                                  data-autosize="true" defaultValue={""}/>
                                        {/* Emoji button */}
                                        <div className="input-group-append position-relative">
                                            {/*<ReactEmojiPicker onSelected={(currentEmoji) => {*/}
                                            {/*    setEmoji(currentEmoji);*/}
                                            {/*}}*/}
                                            {/*/>*/}
                                            <button
                                                onClick={() => setEmoji(true)}
                                                className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                                                type="button">
                                                <img src="assets/images/smile.svg" data-inject-svg="" alt=""/>
                                            </button>
                                            <Picker sheetSize={32} emoji='point_up' showPreview={false} showSkinTones={false} onSelect={addEmoji} style={{width: '318px', display: (!emoji ? 'none' : '')}} enableFrequentEmojiSort={true} />
                                        </div>
                                        {/* Upload button */}
                                        <div className="input-group-append">
                                            <button id="chat-upload-btn-2"
                                                    className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                                                    type="button">
                                                <img src="assets/images/paperclip.svg" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Submit button */}
                                <div className="col-auto">
                                    <button className="btn icon-shape btn-primary rounded-circle" type="submit">
                                        <i className="tio-send"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* Chat: Footer */}
                </div>
                {/* Chat: body */}
                {/* Chat Details */}
                {/*<div id="chat-2-info" className="chat-sidebar">*/}
                {/*    <div className="d-flex h-100 flex-column">*/}
                {/*        /!* Header *!/*/}
                {/*        <div className="border-bottom py-4 py-lg-6">*/}
                {/*            <div className="container-fluid">*/}
                {/*                <ul className="nav justify-content-between align-items-center">*/}
                {/*                    /!* Close sidebar *!/*/}
                {/*                    <li className="nav-item list-inline-item">*/}
                {/*                        <a className="nav-link text-muted px-0" href="#" data-chat-sidebar-close>*/}
                {/*                            <i className="icon-md fe-chevron-left" />*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                    /!* Title(mobile) *!/*/}
                {/*                    <li className="text-center d-block d-lg-none">*/}
                {/*                        <h6 className="mb-n2">Anna Bridges</h6>*/}
                {/*                        <small className="text-muted">Chat Details</small>*/}
                {/*                    </li>*/}
                {/*                    /!* Dropdown *!/*/}
                {/*                    <li className="nav-item list-inline-item">*/}
                {/*                        <div className="dropdown">*/}
                {/*                            <a className="nav-link text-muted px-0" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*                                <i className="icon-md fe-sliders" />*/}
                {/*                            </a>*/}
                {/*                            <div className="dropdown-menu">*/}
                {/*                                <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                    Mute*/}
                {/*                                    <span className="ml-auto fe-bell" />*/}
                {/*                                </a>*/}
                {/*                                <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                    Delete*/}
                {/*                                    <span className="ml-auto fe-trash-2" />*/}
                {/*                                </a>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        /!* Header *!/*/}
                {/*        /!* Body *!/*/}
                {/*        <div className="hide-scrollbar flex-fill">*/}
                {/*            <div className="border-bottom text-center py-9 px-10">*/}
                {/*                /!* Photo *!/*/}
                {/*                <div className="avatar avatar-xl mx-5 mb-5">*/}
                {/*                    <img className="avatar-img" src="assets/images/avatars/10.jpg" alt="" />*/}
                {/*                </div>*/}
                {/*                <h5>Anna Bridges</h5>*/}
                {/*                <p className="text-muted">Bootstrap is an open source toolkit for developing web with HTML, CSS, and JS.</p>*/}
                {/*            </div>*/}
                {/*            /!* Navs *!/*/}
                {/*            <div className="nav nav-tabs nav-justified bg-light rounded-0" role="tablist">*/}
                {/*                <a className="nav-item nav-link active" href="#chat-2-user-details" data-toggle="tab" aria-selected="true" role="tab">Details</a>*/}
                {/*                <a className="nav-item nav-link" href="#chat-2-user-files" data-toggle="tab" role="tab">Files</a>*/}
                {/*            </div>*/}
                {/*            /!* Navs *!/*/}
                {/*            <div className="tab-content" role="tablist">*/}
                {/*                /!* Details *!/*/}
                {/*                <div id="chat-2-user-details" className="tab-pane fade show active" role="tabpanel">*/}
                {/*                    <ul className="list-group list-group-flush mb-8">*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media align-items-center">*/}
                {/*                                <div className="media-body">*/}
                {/*                                    <p className="small text-muted mb-0">Country</p>*/}
                {/*                                    <p>Warsaw, Poland</p>*/}
                {/*                                </div>*/}
                {/*                                <i className="text-muted icon-sm fe-globe" />*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media align-items-center">*/}
                {/*                                <div className="media-body">*/}
                {/*                                    <p className="small text-muted mb-0">Phone</p>*/}
                {/*                                    <p>+39 02 87 21 43 19</p>*/}
                {/*                                </div>*/}
                {/*                                <i className="text-muted icon-sm fe-mic" />*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media align-items-center">*/}
                {/*                                <div className="media-body">*/}
                {/*                                    <p className="small text-muted mb-0">Email</p>*/}
                {/*                                    <p>anna@gmail.com</p>*/}
                {/*                                </div>*/}
                {/*                                <i className="text-muted icon-sm fe-mail" />*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media align-items-center">*/}
                {/*                                <div className="media-body">*/}
                {/*                                    <p className="small text-muted mb-0">Time</p>*/}
                {/*                                    <p>10:03 am</p>*/}
                {/*                                </div>*/}
                {/*                                <i className="text-muted icon-sm fe-clock" />*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                    <ul className="list-group list-group-flush">*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <a href="#" className="media text-muted">*/}
                {/*                                <div className="media-body align-self-center">*/}
                {/*                                    Twitter*/}
                {/*                                </div>*/}
                {/*                                <i className="icon-sm fe-twitter" />*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <a href="#" className="media text-muted">*/}
                {/*                                <div className="media-body align-self-center">*/}
                {/*                                    Facebook*/}
                {/*                                </div>*/}
                {/*                                <i className="icon-sm fe-facebook" />*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <a href="#" className="media text-muted">*/}
                {/*                                <div className="media-body align-self-center">*/}
                {/*                                    Github*/}
                {/*                                </div>*/}
                {/*                                <i className="icon-sm fe-github" />*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*                /!* Details *!/*/}
                {/*                /!* Files *!/*/}
                {/*                <div id="chat-2-user-files" className="tab-pane fade" role="tabpanel">*/}
                {/*                    <ul className="list-group list-group-flush list-group-no-border-first">*/}
                {/*                        /!* File *!/*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media">*/}
                {/*                                <div className="icon-shape bg-primary text-white mr-5">*/}
                {/*                                    <i className="fe-paperclip" />*/}
                {/*                                </div>*/}
                {/*                                <div className="media-body align-self-center overflow-hidden">*/}
                {/*                                    <h6 className="text-truncate mb-0">*/}
                {/*                                        <a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>*/}
                {/*                                    </h6>*/}
                {/*                                    <ul className="list-inline small mb-0">*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted">79.2 KB</span>*/}
                {/*                                        </li>*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted text-uppercase">txt</span>*/}
                {/*                                        </li>*/}
                {/*                                    </ul>*/}
                {/*                                </div>*/}
                {/*                                <div className="align-self-center ml-5">*/}
                {/*                                    <div className="dropdown">*/}
                {/*                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*                                            <i className="fe-more-vertical" />*/}
                {/*                                        </a>*/}
                {/*                                        <div className="dropdown-menu">*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Download <span className="ml-auto fe-download" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Share <span className="ml-auto fe-share-2" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Delete <span className="ml-auto fe-trash-2" />*/}
                {/*                                            </a>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        /!* File *!/*/}
                {/*                        /!* File *!/*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media">*/}
                {/*                                <div className="icon-shape bg-primary text-white mr-5">*/}
                {/*                                    <i className="fe-paperclip" />*/}
                {/*                                </div>*/}
                {/*                                <div className="media-body align-self-center overflow-hidden">*/}
                {/*                                    <h6 className="text-truncate mb-0">*/}
                {/*                                        <a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>*/}
                {/*                                    </h6>*/}
                {/*                                    <ul className="list-inline small mb-0">*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted">79.2 KB</span>*/}
                {/*                                        </li>*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted text-uppercase">psd</span>*/}
                {/*                                        </li>*/}
                {/*                                    </ul>*/}
                {/*                                </div>*/}
                {/*                                <div className="align-self-center ml-5">*/}
                {/*                                    <div className="dropdown">*/}
                {/*                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*                                            <i className="fe-more-vertical" />*/}
                {/*                                        </a>*/}
                {/*                                        <div className="dropdown-menu">*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Download <span className="ml-auto fe-download" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Share <span className="ml-auto fe-share-2" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Delete <span className="ml-auto fe-trash-2" />*/}
                {/*                                            </a>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        /!* File *!/*/}
                {/*                        /!* File *!/*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media">*/}
                {/*                                <div className="icon-shape bg-primary text-white mr-5">*/}
                {/*                                    <i className="fe-paperclip" />*/}
                {/*                                </div>*/}
                {/*                                <div className="media-body align-self-center overflow-hidden">*/}
                {/*                                    <h6 className="text-truncate mb-0">*/}
                {/*                                        <a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>*/}
                {/*                                    </h6>*/}
                {/*                                    <ul className="list-inline small mb-0">*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted">79.2 KB</span>*/}
                {/*                                        </li>*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted text-uppercase">pdf</span>*/}
                {/*                                        </li>*/}
                {/*                                    </ul>*/}
                {/*                                </div>*/}
                {/*                                <div className="align-self-center ml-5">*/}
                {/*                                    <div className="dropdown">*/}
                {/*                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*                                            <i className="fe-more-vertical" />*/}
                {/*                                        </a>*/}
                {/*                                        <div className="dropdown-menu">*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Download <span className="ml-auto fe-download" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Share <span className="ml-auto fe-share-2" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Delete <span className="ml-auto fe-trash-2" />*/}
                {/*                                            </a>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        /!* File *!/*/}
                {/*                        /!* File *!/*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media">*/}
                {/*                                <div className="icon-shape bg-primary text-white mr-5">*/}
                {/*                                    <i className="fe-paperclip" />*/}
                {/*                                </div>*/}
                {/*                                <div className="media-body align-self-center overflow-hidden">*/}
                {/*                                    <h6 className="text-truncate mb-0">*/}
                {/*                                        <a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>*/}
                {/*                                    </h6>*/}
                {/*                                    <ul className="list-inline small mb-0">*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted">79.2 KB</span>*/}
                {/*                                        </li>*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted text-uppercase">txt</span>*/}
                {/*                                        </li>*/}
                {/*                                    </ul>*/}
                {/*                                </div>*/}
                {/*                                <div className="align-self-center ml-5">*/}
                {/*                                    <div className="dropdown">*/}
                {/*                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*                                            <i className="fe-more-vertical" />*/}
                {/*                                        </a>*/}
                {/*                                        <div className="dropdown-menu">*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Download <span className="ml-auto fe-download" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Share <span className="ml-auto fe-share-2" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Delete <span className="ml-auto fe-trash-2" />*/}
                {/*                                            </a>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        /!* File *!/*/}
                {/*                        /!* File *!/*/}
                {/*                        <li className="list-group-item py-6">*/}
                {/*                            <div className="media">*/}
                {/*                                <div className="icon-shape bg-primary text-white mr-5">*/}
                {/*                                    <i className="fe-paperclip" />*/}
                {/*                                </div>*/}
                {/*                                <div className="media-body align-self-center overflow-hidden">*/}
                {/*                                    <h6 className="text-truncate mb-0">*/}
                {/*                                        <a href="#" className="text-reset" title="E5419783-047D-4B4C-B30E-F24DD8247731.JPG">E5419783-047D-4B4C-B30E-F24DD8247731.JPG</a>*/}
                {/*                                    </h6>*/}
                {/*                                    <ul className="list-inline small mb-0">*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted">79.2 KB</span>*/}
                {/*                                        </li>*/}
                {/*                                        <li className="list-inline-item">*/}
                {/*                                            <span className="text-muted text-uppercase">pdf</span>*/}
                {/*                                        </li>*/}
                {/*                                    </ul>*/}
                {/*                                </div>*/}
                {/*                                <div className="align-self-center ml-5">*/}
                {/*                                    <div className="dropdown">*/}
                {/*                                        <a href="#" className="btn btn-sm btn-ico btn-link text-muted w-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                {/*                                            <i className="fe-more-vertical" />*/}
                {/*                                        </a>*/}
                {/*                                        <div className="dropdown-menu">*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Download <span className="ml-auto fe-download" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Share <span className="ml-auto fe-share-2" />*/}
                {/*                                            </a>*/}
                {/*                                            <a className="dropdown-item d-flex align-items-center" href="#">*/}
                {/*                                                Delete <span className="ml-auto fe-trash-2" />*/}
                {/*                                            </a>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </li>*/}
                {/*                        /!* File *!/*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*                /!* Files *!/*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        /!* Body *!/*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* Chat Details */}
            </div>
            {/* Chat */}
        </div>
);
};

export default Chats;