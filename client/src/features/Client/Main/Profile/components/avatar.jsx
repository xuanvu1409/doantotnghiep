import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Modal, Spinner} from "react-bootstrap";
import {useDropzone} from 'react-dropzone';
import {useForm} from "react-hook-form";
import {uploadAvatar} from "../../../../../api/memberApi";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {toast} from "react-toastify";
import Dropzone from "../../../../../components/Share/dropzone";


function MyVerticallyCenteredModal(props) {
    const {onHide, show} = props;
    const {currentMember} = useSelector(state => state.member);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const {handleSubmit} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (show === true) {
            const newFiles = [...files]
            newFiles.splice(0, 1)
            setFiles(newFiles)
        }
    }, [show])

    const onSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('_id', currentMember._id);
        uploadAvatar(formData).then(res => {
            dispatch(getMember(currentMember._id));
            toast.success(res.data.message);
            onHide();
            setLoading(false)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
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
                    {
                        loading
                            ?
                            <button type={"button"} className={"btn btn-primary"} disabled={true}>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />&nbsp;Xin chờ...</button>
                            :
                             (files.length > 0 && <button type={"submit"} className={"btn btn-primary"}>Lưu</button>)
                    }
                    <button type={"button"} onClick={props.onHide} className={"btn btn-danger"}>Đóng</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

const Avatar = () => {
        const {currentMember} = useSelector(state => state.member);
        const [modalShow, setModalShow] = useState(false);

        return (
            <>
                <label
                    className="avatar avatar-xxl avatar-circle avatar-border-lg avatar-uploader profile-cover-avatar"
                    htmlFor="avatarUploader" onClick={() => setModalShow(true)}>
                    <img id="avatarImg" className="avatar-img" src={currentMember.avatar.srcImage}
                         alt="Image Description"/>
                    <span className="avatar-uploader-trigger">
                <i className="tio-edit avatar-uploader-icon shadow-soft"/>
            </span>
                </label>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        );
    }
;

export default Avatar;