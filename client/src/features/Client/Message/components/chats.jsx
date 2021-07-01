import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import 'moment-timezone';
import {titleCase} from "../../../../utils/helper";
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';
import RenderMessage from "./renderMessage";
import ScrollToBottom from 'react-scroll-to-bottom';
import {Dropdown} from "react-bootstrap";
import {useDropzone} from "react-dropzone";

const dropDown = React.forwardRef(({children, onClick}, ref) => (
    <button className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
          type="button"
          ref={ref}
          onClick={(e) => {
              e.preventDefault();
              onClick(e);
          }}
    >
        {children}
    </button>
));

const Chats = (props) => {
    const {messages, me, toMember, sendMessage, errMatched, files, setFiles} = props;
    const {handleSubmit, register, reset, setValue, getValues} = useForm();
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map((file, index) => (
        <div className="col-4 my-2 dz-processing dz-error dz-complete dz-image-preview" key={file.name}>
            <div className="card bg-light">
                <div className="card-body p-2">
                    <div className="media align-items-center">
                        <div className="dropzone-image-preview">
                            <div className="avatar avatar mr-3">
                                <img
                                    src={file.preview}
                                    className="avatar-img rounded" data-dz-thumbnail=""
                                    alt="img13.jpg"/>
                            </div>
                        </div>

                        <div className="media-body overflow-hidden">
                            <h6 className="text-truncate small mb-0"
                                data-dz-name="">{file.name}</h6>
                            <p className="extra-small" data-dz-size=""><strong>{Math.round((file.size / 1024) * 100) / 100}</strong> KB
                            </p>
                        </div>

                        <div className="ml-5">
                            <span onClick={() => removeFile(index)}
                               className="btn btn-sm btn-link text-decoration-none text-muted"
                               data-dz-remove="">
                                <i className="tio-clear"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    const removeFile = (index) => {
        const newFiles = [...files]
        if (newFiles.length > 0) {
            newFiles.splice(index, 1)
            setFiles(newFiles)
        }
    }

    useEffect(() => () => {
        console.log(files)
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const addEmoji = (e) => {
        if (e.native) {
            setValue("content", getValues().content += e.native)
        }
    }

    const onSubmit = (data) => {
        sendMessage(data);
        reset();
    }

    const handleSendMess = (e) => {
        if (e.charCode === 13) {
            handleSubmit(onSubmit)();
        }
        if (e.key === 'Enter') {
            e.preventDefault();
        }
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
                    <ScrollToBottom className={'chat-content'} followButtonClassName={"scroll-btn"}
                                    scrollViewClassName={'px-lg-6'} atEnd={true}>
                        <div className="container-xl py-4 py-lg-6">
                            <RenderMessage messages={messages} me={me}/>
                        </div>
                    </ScrollToBottom>
                    {/* Scroll to end */}
                    {/* Chat: Content */}
                    {/* Chat: DropzoneJS container */}
                    {
                        files.length > 0
                        &&
                        <div className="chat-files hide-scrollbar px-lg-8">
                            <div className="container-xl">
                                <div className="dropzone-previews-js form-row py-3">
                                    {thumbs}
                                </div>
                            </div>
                        </div>
                    }
                    {/* Chat: DropzoneJS container */}
                    {/* Chat: Footer */}
                    <div className="chat-footer border-top py-3 py-lg-4 px-lg-6">
                        {
                            errMatched
                            ?
                                <div className={'text-center'}>Không thể trò chuyện do thành viên này chưa kết đôi với bạn</div>
                                :
                                // <section className="container">
                                //     <div {...getRootProps({className: 'dropzone'})}>
                                //         <input {...getInputProps()} />
                                //         <p>Drag 'n' drop some files here, or click to select files</p>
                                //     </div>
                                // </section>
                                <form id="chat-id-2-form"
                                      onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-row align-items-center">
                                        <div className="col">
                                            <div className="input-group">
                                                {/* Textarea */}
                                                <textarea id="chat-input" {...register('content', {required: true})}
                                                          className="form-control bg-transparent border-0"
                                                          placeholder="Aa" rows={1}
                                                          data-autosize="true" onKeyPress={handleSendMess}/>
                                                {/* Emoji button */}
                                                <div className="input-group-append position-relative">

                                                    <Dropdown>
                                                        <Dropdown.Toggle as={dropDown}>
                                                            <img src="assets/images/smile.svg" data-inject-svg="" alt=""/>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu bsPrefix={'not-box'}>
                                                                <Picker sheetSize={32} emoji='point_up' showPreview={false}
                                                                        showSkinTones={false} onSelect={addEmoji}
                                                                        style={{width: '318px'}}
                                                                        enableFrequentEmojiSort={true}/>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                {/* Upload button */}
                                                <div className="input-group-append">
                                                    <button id="chat-upload-btn-1"
                                                            className=""
                                                            type="button" {...getRootProps({className: 'btn btn-ico btn-secondary btn-minimal bg-transparent border-0'})}>
                                                        <input {...getInputProps()} />
                                                        <img src="assets/images/paperclip.svg" data-inject-svg=""
                                                             alt=""/>
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
                        }
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