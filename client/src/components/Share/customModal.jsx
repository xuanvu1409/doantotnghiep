import {Modal} from "react-bootstrap";
import React from "react";

const CustomModal = (props) => {
    const {show, onHide, children, size, fullScreen, centered} = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size || 'lg'}
            // aria-labelledby="contained-modal-title-vcenter"
            aria-labelledby="example-custom-modal-styling-title"
            centered={centered || true}
            dialogClassName={fullScreen && 'fullscreen-modal'}
            id={fullScreen && 'fullScreenModalId'}
        >
            {children}
        </Modal>
    );
}

export default CustomModal;