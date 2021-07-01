import React from 'react';
import moment from "moment";

const RenderMessage = (props) => {
    const {messages, me} = props;
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
                                                        moment(new Date()).diff(e.updatedAt, 'days') >= 1
                                                            ?
                                                            moment(e.createdAt).format('d-M')
                                                            :
                                                            moment(e.createdAt).format('h:m')
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
                                                            moment(e.createdAt).format('d-M')
                                                            :
                                                            moment(e.createdAt).format('h:m')
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
};

export default RenderMessage;