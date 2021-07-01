import React, {useEffect} from 'react';
import {useDropzone} from "react-dropzone";
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
    width: '100%',
    height: '100%',
    objectFit: 'cover'
};

const Dropzone = ({files, setFiles, mutiple, className, maxFile}) => {

    const {getRootProps, getInputProps} = useDropzone({
        autoDiscover: false,
        accept: 'image/*',
        multiple: mutiple || false,
        maxFiles: maxFile || 1,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
    });

    const removeFile = (event, index) => {
        event.stopPropagation();
        const newFiles = [...files]
        if (newFiles.length > 0) {
            newFiles.splice(index, 1)
            setFiles(newFiles)
        }
    }

    const thumbs = files.map((file, index) => (
        <div key={file.name}>
            <div style={thumb}>
                <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                        alt={file.name}
                    />
                    <div className="d-flex justify-content-end dz-close-icon position-absolute text-white"
                         onClick={(e => removeFile(e, index))} style={{"right": 0}}><small className="tio-clear"/></div>
                </div>
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div {...getRootProps({className: 'js-dropzone dropzone-custom custom-file-boxed dropzone ' + (className || '')})}>
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
    );
};

export default Dropzone;