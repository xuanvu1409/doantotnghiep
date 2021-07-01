import React, {useEffect, useState} from 'react';
import './message.css';
import Chats from "./components/chats";
import Box from "./components/box";
import {socket} from "../../../libs/socketIO";
import {useSelector} from "react-redux";
import {titleCase} from "../../../utils/helper";
import {getMessages, getMessageThread} from "../../../api/messageApi";
import {useParams} from "react-router-dom";

const Index = () => {
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState({
        messageThread: [],
        member: []
    });
    const [me, setMe] = useState(null);
    const [toMember, setToMember] = useState({});
    const [selectThread, setSelectThread] = useState(false);
    const {currentMember} = useSelector(state => state.member);
    const {id} = useParams();
    const [errMatched, setErrMatched] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (id) {
            loadMessage(id)
        }
        getThread();
    }, [])

    const getThread = async (q = '') => {
        let formData = {
            q
        }
        await getMessageThread(formData).then(res => {
            setData({
                messageThread: res.data.thread,
                member: res.data.member
            });
        })
    }

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
            getThread();
        });
    }, [])

    const loadMessage = async (id) => {
        let formData = {
            idTo: id ? id : toMember._id,
            limit: 15
        }
        setFiles([]);
        setSelectThread(true);
        setErrMatched(false);
        await getMessages(formData).then(res => {
            setMe(res.data.me);
            setMessages(res.data.messages);
            setToMember(res.data.toMember);
        }).catch(e => {
            setErrMatched(true);
            setToMember(e.response.data.toMember);
            setMessages(e.response.data.messages);
        })
    }

    const sendMessage = (value) => {
        let formData = {
            messageTo: toMember._id,
            content: value.content
        }
        socket.emit('send-message', formData);
    }

    return (
        <div className={'app-mess'}>
            <Box data={data} loadMessage={loadMessage} getThread={getThread} toMember={toMember}/>
            {
                selectThread
                    ?
                    <Chats
                        files={files}
                        setFiles={setFiles}
                        messages={messages}
                        me={me} toMember={toMember}
                        sendMessage={sendMessage}
                        loadMessage={loadMessage}
                        errMatched={errMatched}
                        getThread={getThread}/>
                    :
                    <div className="main-mess">
                        <div className="chat flex-column justify-content-center text-center">
                            <div className="container-xxl">
                                <div className="avatar avatar-xl avatar-circle mb-3">
                                    <img className="avatar-img" src={currentMember.avatar?.srcImage} alt=""/>
                                </div>
                                <h4>Xin chào, {titleCase(currentMember?.name)}</h4>
                                <p>Vui lòng chọn một cuộc trò chuyện để bắt đầu nhắn tin.</p>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Index;