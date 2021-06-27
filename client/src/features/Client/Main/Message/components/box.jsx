import React from 'react';
import {titleCase} from "../../../../../utils/helper";
import moment from "moment";
import 'moment-timezone';

const Box = (props) => {
    const {messageThread, selectMessageThread} = props;

    return (
        <div className={'sidebar-mess'}>
            <div className="d-flex h-100">
                <div className="hide-scrollbar">
                    <div className="pl-4 pr-4 py-4">
                        {/* Title */}
                        <h1 className="page-header-title mb-4">Trò chuyện</h1>
                        {/* Title */}
                        {/* Search */}
                        <form className="mb-4">
                            <div className="input-group">
                                <input type="text" className="form-control form-control-lg search-color"
                                       placeholder="Search for messages or users..."
                                       aria-label="Search for messages or users..."/>
                                <div className="input-group-append">
                                    <button className="btn btn-lg btn-ico btn-minimal" type="submit">
                                        <i className="tio-search"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* Search */}
                        {/* Favourites */}
                        <div className="text-center hide-scrollbar d-flex my-4" data-horizontal-scroll>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/2.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">William</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/3.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">Simon</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/4.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">Thomas</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/5.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">Zane</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/6.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">Thomas</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/7.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">William</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/8.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">Simon</div>
                            </a>
                            <a href="#" className="d-block text-reset mr-5 mr-lg-4">
                                <div className="avatar mb-2 avatar-circle">
                                    <img className="avatar-img" src="assets/images/avatars/9.jpg"
                                         alt="Image Description"/>
                                    <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                </div>
                                <div className="small">Thomas</div>
                            </a>
                        </div>
                        {/* Favourites */}
                        {/* Chats */}
                        <nav className="nav d-block list-discussions-js mb-n6">
                            {/* Chat link */}
                            {
                                messageThread.length > 0
                                ?
                                messageThread.map(e => (
                                    <div className="text-reset nav-link p-0 mb-2 cursor-pointer" key={e._id} onClick={() => selectMessageThread(e.to._id)}>
                                        <div className="card card-active-listener">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="avatar mr-4">
                                                        <div className="avatar avatar-lg avatar-circle mr-2">
                                                            <img className="avatar-img" src={e.to?.avatar.srcImage}
                                                                 alt="Image Description"/>
                                                            <span
                                                                className="avatar-status avatar-sm-status avatar-status-success"/>
                                                        </div>
                                                    </div>
                                                    <div className="media-body overflow-hidden">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h4 className="text-truncate mb-0 mr-auto">{titleCase(e.to?.name)}</h4>
                                                            <span className="small text-muted text-nowrap ml-4">
                                                                {
                                                                    moment(new Date()).diff(e.updateAt, 'days') >= 1
                                                                        ?
                                                                        moment.tz(e.updateAt, 'Asia/Ho_Chi_Minh').format('d-M')
                                                                        :
                                                                        moment.tz(e.updateAt, 'Asia/Ho_Chi_Minh').format('h:m')
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="text-truncate">Anna Bridges: Hey, Maher! How are
                                                            you?
                                                            The weather is great isn't it?
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="badge badge-circle badge-primary badge-border-light badge-top-right">
                                                <span>3</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                    :
                                    <div className="text-center align-items-center my-9">
                                        Không có cuộc trò chuyện nào
                                    </div>
                            }
                            {/* Chat link */}
                        </nav>
                        {/* Chats */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Box;