import React, {useEffect} from 'react';
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

const Dropzone = ({files, setFiles, mutiple, className}) => {

    const {getRootProps, getInputProps} = useDropzone({
        autoDiscover: false,
        accept: 'image/*',
        multiple: mutiple || false,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
    });

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