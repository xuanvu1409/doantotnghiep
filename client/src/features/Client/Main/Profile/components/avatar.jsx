import React, {useEffect, useState} from 'react';
import {getImage} from "../../../../../utils/helper";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import {useDropzone} from 'react-dropzone';
import {useForm} from "react-hook-form";
import {uploadAvatar} from "../../../../../api/memberApi";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {toast} from "react-toastify";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'center'
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    position: 'relative'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};


function MyVerticallyCenteredModal(props) {
    const {onHide, show} = props;
    const {currentMember} = useSelector(state => state.member);
    const [files, setFiles] = useState([]);
    const {handleSubmit} = useForm();
    const dispatch = useDispatch();
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
    });

    useEffect(() => {
        if (show === true) {
            const newFiles = [...files]
            newFiles.splice(0, 1)
            setFiles(newFiles)
        }
    }, [show])

    const removeFile = (event) => {
        event.stopPropagation();
        const newFiles = [...files]
        if (newFiles.length > 0) {
            newFiles.splice(0, 1)
            setFiles(newFiles)
        }
    }

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div style={thumb}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                        alt={file.name}
                    />
                    <div className="d-flex justify-content-end dz-close-icon position-absolute text-white"
                         onClick={removeFile} style={{"right": 0}}><small className="tio-clear"/></div>
                </div>
            </div>
        </div>
    ));

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('memberAvatar', files[0]);
        formData.append('_id', currentMember._id);
        uploadAvatar(formData).then(res => {
            dispatch(getMember(currentMember._id));
            toast.success(res.data.message);
            onHide();
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

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
                    <div {...getRootProps({className: 'js-dropzone dropzone-custom custom-file-boxed dropzone'})}>
                        <input {...getInputProps()} type="file"/>
                        <div className="dz-message custom-file-boxed-label">
                            {files.length > 0
                                ?
                                <aside style={thumbsContainer}>
                                    {thumbs}
                                </aside>
                                :
                                <>
                                    <img className="avatar avatar-xl avatar-4by3 mb-3"
                                         src="assets/svg/illustrations/browse.svg" alt="Image Description"/>
                                    <h5>Kéo và thả tệp của bạn vào đây hoặc nhấp để chọn ảnh</h5>
                                </>
                            }
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type={"submit"} className={"btn btn-primary"}>Lưu</button>
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
                    <img id="avatarImg" className="avatar-img" src={getImage(currentMember.avatar)}
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