import React, {useEffect, useState} from 'react';
import {useDropzone} from "react-dropzone";

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

const Gallery = () => {
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

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

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

    return (
        <div className="card mb-3 mb-lg-5">
            <form>
                {/* Header */}
                <div className="card-header">
                    <h4 className="card-header-title">Media</h4>
                    { files.length > 0 && <button type={"submit"} className={"btn btn-primary btn-sm"}>Lưu</button>}
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
                        <div className="col-6 col-sm-4 col-md-3">
                            {/* Card */}
                            <div className="card card-sm">
                                <img className="card-img-top" src="assets\img\400x400\img7.jpg" alt="Image Description"/>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col">
                                            <a className="js-fancybox-item text-body" href="javascript:;"
                                               data-toggle="tooltip" data-placement="top" title="View"
                                               data-src="./assets/img/725x1080/img1.jpg" data-caption="Image #01">
                                                <i className="tio-visible-outlined"/>
                                            </a>
                                        </div>
                                        <div className="col column-divider">
                                            <a className="text-danger" href="javascript:;" data-toggle="tooltip"
                                               data-placement="top" title="Delete">
                                                <i className="tio-delete-outlined"/>
                                            </a>
                                        </div>
                                    </div>
                                    {/* End Row */}
                                </div>
                            </div>
                            {/* End Card */}
                        </div>
                        <div className="col-6 col-sm-4 col-md-3">
                            {/* Card */}
                            <div className="card card-sm">
                                <img className="card-img-top" src="assets\img\400x400\img8.jpg" alt="Image Description"/>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col">
                                            <a className="js-fancybox-item text-body" href="javascript:;"
                                               data-toggle="tooltip" data-placement="top" title="View"
                                               data-src="./assets/img/1920x1080/img1.jpg" data-caption="Image #02">
                                                <i className="tio-visible-outlined"/>
                                            </a>
                                        </div>
                                        <div className="col column-divider">
                                            <a className="text-danger" href="javascript:;" data-toggle="tooltip"
                                               data-placement="top" title="Delete">
                                                <i className="tio-delete-outlined"/>
                                            </a>
                                        </div>
                                    </div>
                                    {/* End Row */}
                                </div>
                            </div>
                            {/* End Card */}
                        </div>
                        <div className="col-6 col-sm-4 col-md-3">
                            {/* Card */}
                            <div className="card card-sm">
                                <img className="card-img-top" src="assets\img\400x400\img9.jpg" alt="Image Description"/>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col">
                                            <a className="js-fancybox-item text-body" href="javascript:;"
                                               data-toggle="tooltip" data-placement="top" title="View"
                                               data-src="./assets/img/1920x1080/img2.jpg" data-caption="Image #03">
                                                <i className="tio-visible-outlined"/>
                                            </a>
                                        </div>
                                        <div className="col column-divider">
                                            <a className="text-danger" href="javascript:;" data-toggle="tooltip"
                                               data-placement="top" title="Delete">
                                                <i className="tio-delete-outlined"/>
                                            </a>
                                        </div>
                                    </div>
                                    {/* End Row */}
                                </div>
                            </div>
                            {/* End Card */}
                        </div>
                        <div className="col-6 col-sm-4 col-md-3">
                            {/* Card */}
                            <div className="card card-sm">
                                <img className="card-img-top" src="assets\img\400x400\img10.jpg" alt="Image Description"/>
                                <div className="card-body">
                                    <div className="row text-center">
                                        <div className="col">
                                            <a className="js-fancybox-item text-body" href="javascript:;"
                                               data-toggle="tooltip" data-placement="top" title="View"
                                               data-src="./assets/img/1920x1080/img3.jpg" data-caption="Image #04">
                                                <i className="tio-visible-outlined"/>
                                            </a>
                                        </div>
                                        <div className="col column-divider">
                                            <a className="text-danger" href="javascript:;" data-toggle="tooltip"
                                               data-placement="top" title="Delete">
                                                <i className="tio-delete-outlined"/>
                                            </a>
                                        </div>
                                    </div>
                                    {/* End Row */}
                                </div>
                            </div>
                            {/* End Card */}
                        </div>
                    </div>
                    {/* End Gallery */}
                </div>
            </form>
            {/* Body */}
        </div>
    );
};

export default Gallery;