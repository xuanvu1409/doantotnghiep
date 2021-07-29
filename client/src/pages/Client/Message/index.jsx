import React, {useEffect, useState} from 'react';
import './message.css';
import Chats from "./components/chats";
import Box from "./components/box";
import {socket} from "../../../libs/socketIO";
import {useSelector} from "react-redux";
import {titleCase} from "../../../utils/helper";
import {getMessages, getMessageThread, sendMessages} from "../../../api/messageApi";
import {useHistory, useParams} from "react-router-dom";

const Index = () => {
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState({
        messageThread: [],
        relationship: [],
        me: null
    });
    const [me, setMe] = useState(null);
    const [toMember, setToMember] = useState({});
    const [selectThread, setSelectThread] = useState(false);
    const {currentMember} = useSelector(state => state.member);
    const {id} = useParams();
    const [errMatched, setErrMatched] = useState(false);
    const [files, setFiles] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const history = useHistory();

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
                relationship: res.data.relationship,
                me: res.data.me
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
        setErrMatched(false);
        await getMessages(formData).then(res => {
            setSelectThread(true);
            setMe(res.data.me);
            setMessages(res.data.messages);
            setToMember(res.data.toMember);
        }).catch(e => {
            if (e.response.data.toMember === null) {
                history.push('/messages')
            } else {
                setErrMatched(true);
                setToMember(e.response.data.toMember);
                setMessages(e.response.data.messages);
            }
        })
    }

    const sendMessage = async (value) => {
        setFiles([]);
        setIsSubmiting(true);
        const formData = new FormData();
        formData.append("messageTo", toMember._id);
        formData.append("content", value.content);
        files.map(file => (formData.append('image', file)))
        await sendMessages(formData).then(res => {
            socket.emit('send-message', res.data);
            setIsSubmiting(false)
        })


    }

    function popupwindow(url, title, w, h) {
        const y = window.top.outerHeight / 2 + window.top.screenY - ( h / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
        return window.open(url, window.windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }

    return (
        <div className={'app-mess'}>
            <Box data={data} loadMessage={loadMessage} getThread={getThread} toMember={toMember} me={data.me}/>
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
                        isSubmiting={isSubmiting}
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