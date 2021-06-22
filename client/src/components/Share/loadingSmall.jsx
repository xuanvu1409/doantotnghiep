import React from 'react';

const LoadingSmall = ({loading, style}) => {

    return loading
        ?
        (<div className="box-small" style={style || {}}>
            <div className="cat">
                <div className="cat__body"/>
                <div className="cat__body"/>
                <div className="cat__tail"/>
                <div className="cat__head"/>
            </div>
        </div>)
        :
        (<></>);
};

export default LoadingSmall;