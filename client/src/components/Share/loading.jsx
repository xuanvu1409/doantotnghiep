import React from 'react';

const Loading = (props) => {
    const {loading} = props;

    return (
        loading
        &&
        <div className="box">
            <div className="cat">
                <div className="cat__body"/>
                <div className="cat__body"/>
                <div className="cat__tail"/>
                <div className="cat__head"/>
            </div>
        </div>
    );
};

export default Loading;