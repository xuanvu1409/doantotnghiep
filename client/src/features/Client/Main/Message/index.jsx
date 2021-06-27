import React, {useEffect, useState} from 'react';
import './message.css';
import Chats from "./components/chats";
import Box from "./components/box";
import {socket} from "../../../../libs/socketIO";
import {useSelector} from "react-redux";
import {titleCase} from "../../../../utils/helper";
import {getMessages, getMessageThread} from "../../../../api/messageApi";

const Index = () => {
    const [messages, setMessages] = useState([]);
    const [messageThread, setMessageThread] = useState([]);
    const [me, setMe] = useState(null);
    const [toMember, setToMember] = useState({});
    const [selectThread, setSelectThread] = useState(false);
    const {currentMember} = useSelector(state => state.member);

    useEffect(() => {
        getMessageThread().then(res => {
            setMessageThread(res.data);
        })
    }, [])

    useEffect(() => {
        socket.on('message', message => {
            scollToBottom();
            setMessages(messages => [...messages, message]);
        });
    }, [])

    const selectMessageThread = async (id) => {
        let formData = {
            idTo: id
        }
        setSelectThread(true);
        await getMessages(formData).then(res => {
            setMe(res.data.me);
            setMessages(res.data.messages);
            setToMember(res.data.toMember)
            scollToBottom();
        })
    }

    const sendMessage = (value) => {
        let formData = {
            messageTo: toMember._id,
            content: value.content
        }
        socket.emit('send-message', formData);
    }

    const scollToBottom = () => {
        const elem = document.getElementById('end-of-chat');
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className={'app-mess'}>
            <Box messageThread={messageThread} selectMessageThread={selectMessageThread}/>
            {
                selectThread
                    ?
                    <Chats messages={messages} me={me} toMember={toMember} sendMessage={sendMessage}/>
                    :
                    <div className="main-mess">
                        <div className="chat flex-column justify-content-center text-center">
                            <div className="container-xxl">
                                <div className="avatar avatar-xl avatar-circle mb-3">
                                    <img className="avatar-img" src={currentMember.avatar?.srcImage} alt=""/>
                                </div>
                                <h4>Chào, {titleCase(currentMember?.name)}</h4>
                                <p>Vui lòng chọn một cuộc trò chuyện để bắt đầu nhắn tin.</p>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Index;