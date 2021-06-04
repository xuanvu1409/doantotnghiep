import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGalleryById, removeImageById, setAvatarById, uploadImage} from "../../../../../api/memberApi";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getImage} from "../../../../../utils/helper";
import {Spinner} from "react-bootstrap";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {sweetAlert} from "../../../../../libs/sweetAlert2";
import Dropzone from "../../../../../components/Share/dropzone";

const Gallery = () => {
    const dispatch = useDispatch();
    const {currentMember} = useSelector(state => state.member);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const {handleSubmit} = useForm()
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getGallery();
    }, [])

    const getGallery = async () => {
        await getGalleryById(currentMember._id).then(res => {
            setGallery(res.data);
        })
    }

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



    const setAvatar = async (_id) => {
        sweetAlert.warning("Đặt làm ảnh đại diện", "Bạn chắc chắn chọn ảnh này làm ảnh đại diện?", async () => {
            await setAvatarById(_id).then(res => {
                console.log(res)
                dispatch(getMember(res.data._id));
                toast.success(res.data.message);
            }).catch(e => {
                console.log(e)
            })
        })
    }


    const removeImage = async (_id) => {
        sweetAlert.warning("Xóa ảnh", "Bạn chắc chắn muốn xóa ảnh này?", async () => {
            await removeImageById(_id).then(res => {
                toast.success(res.data.message);
                getGallery();
            })
        })
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

                    <Dropzone files={files} setFiles={setFiles} mutiple={true} className={"mb-3 mb-lg-5"} />
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
                                                <span onClick={() => setAvatar(e._id)} className="js-fancybox-item text-body">
                                                    <i className="tio-visible-outlined"/>
                                                </span>
                                            </div>
                                            <div className="col column-divider">
                                                <span onClick={() => removeImage(e._id)}
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
        </div>
    );
};

export default Gallery;