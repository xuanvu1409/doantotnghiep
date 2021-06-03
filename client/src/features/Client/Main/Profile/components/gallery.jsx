import React, {useEffect, useState} from 'react';
import {useDropzone} from "react-dropzone";
import {useSelector} from "react-redux";
import {getGalleryById, removeImageById, uploadImage} from "../../../../../api/memberApi";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getImage} from "../../../../../utils/helper";
import {Button, Modal, Spinner} from "react-bootstrap";

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
    const {item, loadImage, onHide} = props;

    useEffect(() => {
        console.log(item)
    })


    const removeImage = async () => {
        await removeImageById(item).then(res => {
            toast.success(res.data.message);
            loadImage();
            onHide()
        })
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Xoá ảnh
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Bạn chắc chắn muốn xóa ảnh này
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => removeImage()}>Xác nhận</Button>
                <Button onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
}

const Gallery = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const {currentMember} = useSelector(state => state.member);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemRemove, setItemRemove] = useState(0);
    const {handleSubmit} = useForm();
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
    });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getGallery();
    }, [])

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const getGallery = async () => {
        await getGalleryById(currentMember._id).then(res => {
            setGallery(res.data);
        })
    }

    const removeFile = (event, i) => {
        event.stopPropagation();
        const newFiles = [...files]
        if (newFiles.length > 0) {
            newFiles.splice(i, 1)
            setFiles(newFiles)
        }
    }

    const thumbs = files.map((file, i) => (
        <div key={file.name}>
            <div style={thumb}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                        alt={file.name}
                    />
                    <div className="d-flex justify-content-end dz-close-icon position-absolute text-white"
                         onClick={(e) => removeFile(e, i)} style={{"right": 0}}><small className="tio-clear"/></div>
                </div>
            </div>
        </div>
    ));

    const onSubmit = (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("_id", currentMember._id);
        files.map(file => (formData.append('image', file)))
        uploadImage(formData).then(res => {
            toast.success(res.data.message);
            getGallery();
            const newFiles = [...files]
            if (newFiles.length > 0) {
                newFiles.splice(0, newFiles.length);
                setFiles(newFiles);
            }
            setLoading(false);
        }).catch(e => console.log(e))
    }

    const openModal = (_id) => {
        setModalShow(true);
        setItemRemove(_id);
    }

    return (
        <div className="card mb-3 mb-lg-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Header */}
                <div className="card-header">
                    <h4 className="card-header-title">Media</h4>
                    {
                        files.length > 0
                        &&
                        (
                            loading
                                ?
                                <button className="btn btn-primary btn-sm" type="button" disabled>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    &nbsp;Xin chờ...
                                </button>
                                :
                                <button type={"submit"} className={"btn btn-primary btn-sm"}>Lưu</button>
                        )
                    }
                </div>
                {/* End Header */}

                {/* Body */}
                <div className="card-body">

                    <div {...getRootProps({className: 'js-dropzone dropzone-custom custom-file-boxed dropzone mb-3 mb-lg-5'})}>
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
                    {/* End Dropzone */}
                    {/* Gallery */}
                    <div id="fancyboxGallery" className="js-fancybox row justify-content-sm-center gx-2"
                         data-hs-fancybox-options="{
                     &quot;selector&quot;: &quot;#fancyboxGallery .js-fancybox-item&quot;
                   }">
                        {gallery.map(e => (
                            <div className="col-6 col-sm-4 col-md-3 mb-3" key={e._id}>
                                {/* Card */}
                                <div className="card card-sm">
                                    <img className="card-img-top"
                                         src={e.cloudinaryId ? e.srcImage : getImage(e.srcImage)}
                                         alt="Image Description"/>
                                    <div className="card-body">
                                        <div className="row text-center">
                                            <div className="col">
                                                <span className="js-fancybox-item text-body">
                                                    <i className="tio-visible-outlined"/>
                                                </span>
                                            </div>
                                            <div className="col column-divider">
                                                <span onClick={() => openModal(e._id)}
                                                      className="text-danger btn-remove-image" data-toggle="tooltip"
                                                      data-placement="top" title="Delete">
                                                    <i className="tio-delete-outlined"/>
                                                </span>
                                            </div>
                                        </div>
                                        {/* End Row */}
                                    </div>
                                </div>
                                {/* End Card */}
                            </div>
                        ))}
                    </div>
                    {/* End Gallery */}
                </div>
            </form>
            {/* Body */}
            <MyVerticallyCenteredModal
                loadImage={getGallery}
                item={itemRemove}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default Gallery;