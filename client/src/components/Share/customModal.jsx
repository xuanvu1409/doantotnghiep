import {Modal} from "react-bootstrap";
import React from "react";

const CustomModal = (props) => {
    const {show, onHide, children, size} = props;
    return (
        <Modal
            show={show}
            onHide={onHide}
            size={size || 'lg'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {children}
        </Modal>
    );
}

export default CustomModal;