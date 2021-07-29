import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {uploadAvatar} from "../../../../../api/memberApi";
import {toast} from "react-toastify";
import Dropzone from "../../../../../components/Share/dropzone";
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";


const Avatar = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const {handleSubmit} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalShow === true) {
            const newFiles = [...files]
            newFiles.splice(0, 1)
            setFiles(newFiles)
        }
    }, [modalShow])

    const onSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', files[0]);
        uploadAvatar(formData).then(res => {
            toast.success(res.data.message);
            setModalShow(false)
            setLoading(false)
            dispatch(getMember()).then(res => {
                props.setMember(res.payload);
            })
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <>
            <label
                className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar"
                htmlFor="avatarUploader" onClick={() => props.isMe && setModalShow(true)}>
                <img id="avatarImg" className="avatar-img" src={props.avatar?.srcImage}
                alt="Image Description"/>
                <span className="avatar-uploader-trigger">
            <i className="tio-edit avatar-uploader-icon shadow-soft"/>
        </span>
            </label>
            <Modal show={modalShow} onHide={() => setModalShow(false)} size={'md'} centered>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Cập nhật ảnh đại diện
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Dropzone files={files} setFiles={setFiles}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonSubmit className={'mr-2'} loading={loading}/>
                        <button type={"button"} onClick={() => setModalShow(false)} className={"btn btn-danger"}>Đóng
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

export default Avatar;