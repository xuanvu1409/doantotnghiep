import React from 'react';
import {Spinner} from "react-bootstrap";

const ButtonSubmit = ({loading, className, buttonText}) => {

    return (
        loading
            ?
            <button type={"button"} className={"btn btn-primary " + (className || '')} disabled={true}>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />&nbsp;Xin chờ...</button>
            : <button type={"submit"} className={"btn btn-primary " + (className || '')}>{buttonText || 'Lưu'}</button>
    )
        ;
};

export default ButtonSubmit;