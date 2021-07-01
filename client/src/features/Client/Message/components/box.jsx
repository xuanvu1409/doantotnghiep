import React, {useEffect} from 'react';
import {titleCase} from "../../../../utils/helper";
import moment from "moment";
import 'moment-timezone';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

const Box = (props) => {
    const {data, loadMessage, getThread, toMember} = props;
    const {messageThread, member} = data;
    const {handleSubmit, register, reset} = useForm();

    const onSubmit = async data => {
        await getThread(data.q);
        reset();
    }

    useEffect(() => {
        [].forEach.call(document.querySelectorAll('[data-horizontal-scroll]'), function (el) {
            function scrollHorizontally(e) {
                e = window.event || e;
                var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                el.scrollLeft -= (delta*28);
                e.preventDefault();
            }

            if (el.addEventListener) {
                el.addEventListener("mousewheel", scrollHorizontally, false);
                el.addEventListener("DOMMouseScroll", scrollHorizontally, false);
            } else {
                el.attachEvent("onmousewheel", scrollHorizontally);
            }
        });
    }, [])

    return (
        <div className={'sidebar-mess'}>
            <div className="h-100">
                <div className="hide-scrollbar">
                    <div className="pl-4 pr-4 py-4">
                        {/* Title */}
                        <div className={'d-flex'}>
                            <Link to={'/'} className="btn btn-icon btn-soft-primary rounded-circle mr-2"><i className="tio-home-outlined"/></Link>
                            <h1 className="page-header-title mb-4">Trò chuyện</h1>
                        </div>
                        {/* Title */}
                        {/* Search */}
                        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group">
                                <input type="text" {...register("q")} className="form-control form-control-lg search-color"
                                       placeholder="Tìm kiếm tên bạn bè..."/>
                                <div className="input-group-append">
                                    <button className="btn btn-lg btn-ico btn-minimal" type="submit">
                                        <i className="tio-search"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* Search */}
                        {/* Favourites */}
                        <div className="text-center hide-scrollbar d-flex my-4" data-horizontal-scroll={true}>
                            {
                                member.map(e => (
                                    <span className="d-block text-reset mr-5 mr-lg-4" key={e._id}>
                                        <div className="avatar mb-2 avatar-circle">
                                            <img className="avatar-img" src={e.avatar.srcImage}
                                                 alt="Image Description"/>
                                            {
                                                e.role
                                                &&
                                                <span className="avatar-status avatar-sm-status avatar-status-success"/>
                                            }
                                        </div>
                                    </span>
                                ))
                            }
                        </div>
                        {/* Favourites */}
                        {/* Chats */}
                        <nav className="nav d-block list-discussions-js mb-n6">
                            {/* Chat link */}
                            {
                                messageThread.length > 0
                                ?
                                messageThread.map(e => (
                                    <div className="text-reset nav-link p-0 mb-2 cursor-pointer" key={e._id} onClick={() => loadMessage(e.member._id)}>
                                        <div className={'card card-active-listener' + (e.member._id === toMember._id ? ' active' : '')}>
                                            <div className="card-body">
                                                <div className="media">
                                                        <div className="avatar avatar-lg avatar-circle mr-3">
                                                            <img className="avatar-img" src={e.member?.avatar.srcImage}
                                                                 alt="Image Description"/>
                                                            <span
                                                                className="avatar-status avatar-sm-status avatar-status-success"/>
                                                        </div>
                                                    <div className="media-body overflow-hidden">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h4 className="text-truncate mb-0 mr-auto">{titleCase(e.member?.name)}</h4>
                                                            <span className="small text-muted text-nowrap ml-4">
                                                                {
                                                                    moment(new Date()).diff(e.updatedAt, 'days') >= 1
                                                                        ?
                                                                        moment.tz(e.updatedAt, 'Asia/Ho_Chi_Minh').format('d-M')
                                                                        :
                                                                        moment.tz(e.updatedAt, 'Asia/Ho_Chi_Minh').format('h:m')
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="text-truncate">{e.lastMessage}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                e.notRead > 0
                                                &&
                                                <div
                                                    className="badge badge-circle badge-primary badge-border-light badge-top-right">
                                                    <span>{e.notRead}</span>
                                                </div>
                                            }
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