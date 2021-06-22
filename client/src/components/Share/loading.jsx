import React from 'react';
import {useSelector} from "react-redux";

const Loading = () => {
    const loading = useSelector(state => state.app);

    return loading
            ?
            (<div className="box">
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

export default Loading;