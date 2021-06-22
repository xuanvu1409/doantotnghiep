import React from 'react';

const Action = (props) => {
    const {like, skip, liked, loading} = props;

    return (
        <div id="actions">
            <button type={"button"} disabled={true}>
                <i className="tio-restore"/>
            </button>
            <button type={"button"} onClick={like()} className={liked ? 'active' : ''} disabled={loading}>
                <i className="tio-heart"/>
            </button>
            <button type={"button"} onClick={skip()} disabled={loading}>
                <i className="tio-clear"/>
            </button>
            <button type={"button"} disabled={loading}>
                <i className="tio-star" />
            </button>
            <button type={"button"} disabled={loading}>
                <i className="tio-favorite-comment"/>
            </button>
        </div>
    );
};

export default Action;